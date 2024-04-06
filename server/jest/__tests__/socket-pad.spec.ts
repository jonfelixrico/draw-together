import { Socket, io } from 'socket.io-client'
import { createAppInstance } from '@test/utils/server.test-utils'
import { connectWrapperManager } from '@test/utils/socket.test-utils'
import Bluebird from 'bluebird'
import { createTestAxios } from '@test/utils/axios.test-utils'

describe('socket-join', () => {
  const testAxios = createTestAxios(3002)

  let serverCleanup: () => Promise<void>
  let roomId: string
  beforeAll(async () => {
    console.log('starting')
    const { close } = await createAppInstance()
    serverCleanup = close

    const { data } = await testAxios.post<{
      id: string
    }>('/room')

    roomId = data.id
  }, 10_000)
  afterAll(async () => {
    await serverCleanup!()
  })

  const { connectWrapper, disconnectAll } = connectWrapperManager()
  let clientA: Socket
  let clientB: Socket

  beforeEach(async () => {
    clientA = await connectWrapper(
      io('http://localhost:3002', {
        query: {
          roomId,
          clientId: 'user-a',
          nanme: 'User A',
        },
      })
    )

    clientB = await connectWrapper(
      io('http://localhost:3002', {
        query: {
          roomId,
          clientId: 'user-a',
          nanme: 'User A',
        },
      })
    )
  })

  afterEach(() => {
    disconnectAll()
  })

  it('broadcasts PAD events', async () => {
    const clientAHandler = jest.fn()
    const clientBHandler = jest.fn()

    clientA.on('PAD', clientAHandler)
    clientB.on('PAD', clientBHandler)

    clientA.emit('PAD', {
      DUMMY_MESSAGE: {
        foo: 'bar',
      },
    })

    await Bluebird.delay(1_000)
    expect(clientAHandler).not.toHaveBeenCalled()
    expect(clientBHandler).toHaveBeenCalledWith({
      DUMMY_MESSAGE: {
        foo: 'bar',
      },
    })
  })
})
