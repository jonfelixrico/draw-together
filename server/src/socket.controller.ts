import { Server, Socket } from "socket.io"

function getQSData ({ request }: Socket) {
  /*
   * No need to provide a real base URL since we're only using `url` to extract the query
   * params from the relative path provided by request.url
   */
  const url = new URL(request.url as string, 'http://localhost')
  return {
    // TODO use the `qs` library for this
    roomId: url.searchParams.get('roomId'),
    clientId: url.searchParams.get('clientId') || 'UNKNOWN_ID',
    name: url.searchParams.get('name') || 'UNKNOWN_NAME'
  }
}

interface ConnectedClient {
  id: string
  name: string
}

type RoomDict = {
  [roomId: string]: {
    [clientId: string]: ConnectedClient
  }
}

export function socketIOHandler (io: Server) {
  const rooms: RoomDict = {}

  io.on('connect', (socket: Socket) => {
    const { roomId, clientId, name } = getQSData(socket)
  
    console.debug('Socket %s has connected', clientId)
  
    if (!roomId) {
      socket.emit('ERROR', 'NO_ROOM_ID')
      socket.disconnect()
      console.warn('Disconnected socket %s, resason: no room ID found in query params', clientId)
      return
    }
  
    // TODO add checking for unknown clientId
    // TODO add checking for unknown name
  
    // TODO add checking for nonexistent rooms

    socket.join(roomId)
    socket.broadcast.to(roomId).emit('SERVER', {
      code: 'CONN_ACTIVITY',
      payload: {
        id: clientId,
        name,        
        action: 'join'
      }
    })
    console.debug('Connected socket %s to room %s', clientId, roomId)

    if (!rooms[roomId]) {
      rooms[roomId] = {}
    }

    if (!rooms[roomId][clientId]) {
      rooms[roomId][clientId] = {
        id: clientId,
        name
      }
    }

    socket.on('disconnect', () => {
      io.to(roomId).emit('SERVER', {
        code: 'CONN_ACTIVITY',
        payload: {
          id: clientId,
          name,
          action: 'leave'
        }
      })
      delete rooms[roomId][clientId]

      console.debug('Client %s has left', clientId)
    })


    socket.on('SERVER', ({ code }: { code: string }, respond: (response: unknown) => void) => {
      switch (code) {
        case 'CONN_LIST': {
          respond(Object.values(rooms[roomId]))
          console.debug('Sent %s the list of connected participants', clientId)
          break
        }

        default: {
          console.debug('Unknown SERVER_REQ code: %s', code)
          respond(null)
        }
      }
    })
  
    // The purpose of this is to just relay the message to all participants
    socket.on('PAD', (payload: Record<string, unknown>) => {
      console.debug('Relayed %o to room %s, from client %s', payload, roomId, clientId)
      socket.broadcast.to(roomId).emit('PAD', payload)
    })
  })
}