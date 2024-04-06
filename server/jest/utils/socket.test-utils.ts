import { Socket } from 'socket.io-client'

export function connectWrapper(socket: Socket) {
  const waiter = new Promise<Socket>((resolve, reject) => {
    socket.once('connect', () => {
      resolve(socket)
    })
    socket.once('connect_error', reject)
  })
  socket.connect()

  return waiter
}
