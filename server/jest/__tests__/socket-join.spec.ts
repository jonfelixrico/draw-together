import { io } from 'socket.io-client'
import { testAxios } from '@test/lib/axios'
import { createAppInstance } from '@test/utils/server.test-utils'
import { connectWrapperManager } from '@test/utils/socket.test-utils'

describe('socket-join', () => {
  let serverCleanup: () => Promise<void>

  const { connectWrapper, disconnectAll } = connectWrapperManager()

  beforeEach(async () => {
    const { close } = await createAppInstance()
    serverCleanup = close
  })

  it('allows connecting', async () => {
    const { data } = await testAxios.post<{ roomId: string }>('/room')
    const roomId = data.roomId

    const client = io('http://localhost:3000', {
      query: {
        roomId,
        name: 'User 1',
        clientId: 'user-1',
      },
    })

    await expect(connectWrapper(client)).resolves.toBeTruthy()
  })

  it('broadcasts joins to other people', async () => {
    const { data } = await testAxios.post<{ roomId: string }>('/room')
    const roomId = data.roomId

    const clientA = await connectWrapper(
      io('http://localhost:3000', {
        query: {
          roomId,
          name: 'User 1',
          clientId: 'user-1',
        },
      })
    )

    const connectSpy = jest.fn()
    clientA.once('SERVER', connectSpy)

    // role: joiner
    await connectWrapper(
      io('http://localhost:3000', {
        query: {
          roomId,
          name: 'User 2',
          clientId: 'user-2',
        },
      })
    )

    expect(connectSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        CONN_ACTIVITY: {
          id: 'user-2',
          name: 'User 2',
        },
      })
    )
  })

  afterEach(async () => {
    disconnectAll()
    await serverCleanup!()
  })
})
