import { ManagerOptions, SocketOptions, io, Socket } from "socket.io-client";

export function createSocket (options: Partial<ManagerOptions & SocketOptions>): Promise<Socket> {
  const socket = io(options)

  return new Promise((resolve, reject) => {
    socket.once('connect_error', (error: Error) => {
      reject(error)
    })

    socket.once('connect', () => {
      resolve(socket)
    })
  })
}