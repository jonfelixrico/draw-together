import { ManagerOptions, SocketOptions, io, Socket } from "socket.io-client";

export class SocketIoError extends Error {
  constructor (cause: Error) {
    // TODO find a way to pass cause as an error
    super(cause.message)
  }
}


export function createSocket (options: Partial<ManagerOptions & SocketOptions>): Promise<Socket> {
  const socket = io(options)

  return new Promise((resolve, reject) => {
    socket.once('connect_error', (error: Error) => {
      reject(new SocketIoError(error))
    })

    socket.once('connect', () => {
      resolve(socket)
    })
  })
}