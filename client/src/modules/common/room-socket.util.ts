import { createSocket } from '../socket/socket.util'

/**
 * @deprecated Unnecessary layer. Will remove soon.
 * TODO remove this
 */
export async function createRoomSocket(options: {
  roomId: string
  clientId: string
  name: string
}) {
  return await createSocket({
    query: options,
    path: '/api/socket.io',
    autoConnect: false,
  })
}
