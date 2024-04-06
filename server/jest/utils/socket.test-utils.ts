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

export function connectWrapperManager() {
  let clients: Socket[] = []

  async function connect(socket: Socket) {
    const client = await connectWrapper(socket)
    clients.push(client)
    return client
  }

  function disconnectAll() {
    clients.forEach((client) => client.disconnect())
    clients = []
  }

  return {
    connectWrapper: connect,
    disconnectAll,
  }
}
