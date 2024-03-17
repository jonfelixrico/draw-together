import { createSocket } from './socket.util'

export async function createRoomSocket(options: {
  roomId: string
  clientId: string
  name: string
}) {
  return await createSocket({
    query: options,
    path: '/api/socket.io',
  })
}
