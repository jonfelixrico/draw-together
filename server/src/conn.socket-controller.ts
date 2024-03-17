import { Server, Socket } from 'socket.io'

interface ConnectedClient {
  id: string
  name: string
}

type RoomDict = {
  [roomId: string]: {
    [clientId: string]: ConnectedClient
  }
}

const rooms: RoomDict = {}

function addToRoom (roomId: string, userDetails: {
  clientId: string
  name: string
}) {
  const { clientId, name } = userDetails

  if (!rooms[roomId]) {
    rooms[roomId] = {}
  }

  rooms[roomId][clientId] = {
    id: clientId,
    name,
  }
}

function removeFromRoom(roomId: string, clientId: string) {
  delete rooms[roomId][clientId]
}

export function initConnHandler(server: Server, socket: Socket, userDetails: {
  roomId: string
  name: string
  clientId: string
}) {
  const { roomId, clientId, name } = userDetails

  addToRoom(roomId, userDetails)
  console.debug('Connected socket %s to room %s', clientId, roomId)

  socket.broadcast.to(roomId).emit('SERVER', {
    CONN_ACTIVITY: {
      id: clientId,
      name,
      action: 'join',
    }
  })

  socket.on('disconnect', () => {
    server.to(roomId).emit('SERVER', {
      CONN_ACTIVITY: {
        id: clientId,
        name,
        action: 'leave',
      }
    })
    removeFromRoom(roomId, clientId)

    console.debug('Client %s has left', clientId)
  })

  socket.on(
    'SERVER',
    (msg: Record<string, unknown>, respond: (response: unknown) => void) => {
      if (msg.CONN_LIST) {
        respond({
          CONN_LIST: Object.values(rooms[roomId])
        })
        console.debug(
          'Sent %s the list of connected participants',
          clientId
        )
        return
      }

      console.debug('Unknown message')
      respond(null)
    }
  )
}
