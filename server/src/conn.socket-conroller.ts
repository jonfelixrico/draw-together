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

export function initConnHandler(socket: Socket, userDetails: {
  roomId: string
  name: string
  clientId: string
}) {
  const { roomId, clientId, name } = userDetails

  socket.join(roomId)
  console.debug('Connected socket %s to room %s', clientId, roomId)

  socket.broadcast.to(roomId).emit('SERVER', {
    code: 'CONN_ACTIVITY',
    payload: {
      id: clientId,
      name,
      action: 'join',
    },
  })

  socket.on('disconnect', () => {
    socket.broadcast.to(roomId).emit('SERVER', {
      code: 'CONN_ACTIVITY',
      payload: {
        id: clientId,
        name,
        action: 'leave',
      },
    })
    removeFromRoom(roomId, clientId)

    console.debug('Client %s has left', clientId)
  })

  socket.on(
    'SERVER',
    ({ code }: { code: string }, respond: (response: unknown) => void) => {
      switch (code) {
        case 'CONN_LIST': {
          respond(Object.values(rooms[roomId]))
          console.debug(
            'Sent %s the list of connected participants',
            clientId
          )
          break
        }

        default: {
          console.debug('Unknown SERVER_REQ code: %s', code)
          respond(null)
        }
      }
    }
  )
}
