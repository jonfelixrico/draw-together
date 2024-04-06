import { io } from 'socket.io-client'
import { createAppInstance } from '@test/utils/server.test-utils'
import { connectWrapperManager } from '@test/utils/socket.test-utils'
import Bluebird from 'bluebird'
import { createTestAxios } from '@test/utils/axios.test-utils'

describe('socket-join', () => {
  const testAxios = createTestAxios(3001)
  const { connectWrapper, disconnectAll } = connectWrapperManager()
  afterEach(() => {
    disconnectAll()
  })

  let serverCleanup: () => Promise<void>
  beforeAll(async () => {
    const { close } = await createAppInstance(3001)
    serverCleanup = close
  })
  afterAll(async () => {
    await serverCleanup!()
    console.log('closing')
  })

  it('allows connecting', async () => {
    const { data } = await testAxios.post<{ id: string }>('/room')
    const roomId = data.id

    const client = io('http://localhost:3001', {
      query: {
        roomId,
        name: 'User 1',
        clientId: 'user-1',
      },
    })

    await expect(connectWrapper(client)).resolves.toBeTruthy()
  })

  it('broadcasts joins/leaves to other people', async () => {
    const { data } = await testAxios.post<{ id: string }>('/room')
    const roomId = data.id

    const clientA = await connectWrapper(
      io('http://localhost:3001', {
        query: {
          roomId,
          name: 'User 1',
          clientId: 'user-1',
        },
      })
    )

    const serverEventSpy = jest.fn()
    clientA.on('SERVER', serverEventSpy)

    // role: joiner
    const clientB = await connectWrapper(
      io('http://localhost:3001', {
        query: {
          roomId,
          name: 'User 2',
          clientId: 'user-2',
        },
        forceNew: true,
      })
    )

    expect(serverEventSpy).toHaveBeenNthCalledWith(1, {
      CONN_ACTIVITY: expect.objectContaining({
        id: 'user-2',
        name: 'User 2',
        action: 'join',
      }),
    })

    clientB.disconnect()
    /*
     * Arbitray delay, we just want to wait for the server broadcast for disconnect
     * TODO find a better method than doing a delay. this is not going to be very consistent if the server takes longer than the delay to broadcast.
     *
     * Things tried before falling back to this:
     * - Listening for the disconnect event on clientB (`clientB.once('disconnect', ...)`). The event firing doesn't mean that the message has been
     *   broadcasted.
     * - // add more here
     */
    await Bluebird.delay(1_000)
    expect(serverEventSpy).toHaveBeenNthCalledWith(2, {
      CONN_ACTIVITY: expect.objectContaining({
        id: 'user-2',
        name: 'User 2',
        action: 'leave',
      }),
    })
  })
})
