import { io } from 'socket.io-client'
import { testAxios } from '@test/lib/axios'
import { createAppInstance } from '@test/utils/server.test-utils'
import { connectWrapperManager } from '@test/utils/socket.test-utils'
import Bluebird from 'bluebird'

describe('socket-join', () => {
  let serverCleanup: () => Promise<void>

  const { connectWrapper, disconnectAll } = connectWrapperManager()

  beforeEach(async () => {
    const { close } = await createAppInstance()
    serverCleanup = close
  })

  it('allows connecting', async () => {
    const { data } = await testAxios.post<{ id: string }>('/room')
    const roomId = data.id

    const client = io('http://localhost:3000', {
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
      io('http://localhost:3000', {
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
      io('http://localhost:3000', {
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

    await new Promise<void>((resolve) => {
      clientB.once('disconnect', () => resolve())
      clientB.disconnect()
    })

    /*
     * Arbitray delay, we just want to wait for the server broadcast for disconnect
     * TODO find a better method than doing a delay. this is not going to be very consistent if the server takes longer than the delay to broadcast.
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

  afterEach(async () => {
    disconnectAll()
    await serverCleanup!()
  })
})
