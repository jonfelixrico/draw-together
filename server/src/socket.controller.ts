import { initConnHandler } from 'conn.socket-controller'
import { padHistoryHandler } from './pad-history.socket-controller'
import { Server, Socket } from 'socket.io'

function getQSData({ request }: Socket) {
  /*
   * No need to provide a real base URL since we're only using `url` to extract the query
   * params from the relative path provided by request.url
   */
  const url = new URL(request.url as string, 'http://localhost')
  return {
    // TODO use the `qs` library for this
    roomId: url.searchParams.get('roomId'),
    clientId: url.searchParams.get('clientId') || 'UNKNOWN_ID',
    name: url.searchParams.get('name') || 'UNKNOWN_NAME',
  }
}

export function socketIOHandler(server: Server) {
  server.on('connect', (socket: Socket) => {
    const { roomId, clientId, name } = getQSData(socket)

    console.debug('Socket %s has connected', clientId)

    if (!roomId) {
      socket.emit('ERROR', 'NO_ROOM_ID')
      socket.disconnect()
      console.warn(
        'Disconnected socket %s, resason: no room ID found in query params',
        clientId
      )
      return
    }

    // TODO add checking for unknown clientId
    // TODO add checking for unknown name

    // TODO add checking for nonexistent rooms

    socket.join(roomId)
    initConnHandler(server, socket, { roomId, clientId, name })

    // The purpose of this is to just relay the message to all participants
    socket.on('PAD', (payload: Record<string, unknown>) => {
      console.debug(
        'Relayed %o to room %s, from client %s',
        payload,
        roomId,
        clientId
      )
      socket.broadcast.to(roomId).emit('PAD', payload)
    })

    padHistoryHandler(socket, roomId)
  })
}
