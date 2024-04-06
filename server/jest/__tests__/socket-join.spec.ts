import { Server } from 'http'
import { Socket, io } from 'socket.io-client'
import { testAxios } from '@test/lib/axios'
import { connectWrapper } from '@test/utils/socket.test-utils'
import { createAppInstance } from '@test/utils/server.test-utils'

describe('socket-join', () => {
  let server: Server

  beforeEach(async () => {
    server = await createAppInstance()
  })

  it('allows connecting', async () => {
    let client: Socket
    const { data } = await testAxios.post<{ roomId: string }>('/room')
    const roomId = data.roomId

    try {
      client = io('http://localhost:3000', {
        query: {
          roomId,
          name: 'User 1',
          clientId: 'user-1',
        },
      })

      await expect(connectWrapper(client)).resolves.toBeTruthy()
    } finally {
      client!.disconnect()
    }
  })

  afterEach(() => {
    server!.close()
  })
})
