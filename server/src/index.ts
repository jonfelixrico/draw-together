import { config } from 'dotenv'
config({
  path: ['.env.local', '.env']
})

import express from 'express'
import { nanoid } from 'nanoid'
import { createServer } from 'http'
import { Server, Socket } from 'socket.io'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (_, res) => {
  res.send('Hello World')
})

const roomObjects: Record<string, Object> = {}

app.post('/room', (_, res) => {
  const id = nanoid()
  roomObjects[id] = {}
  
  res.json({
    id
  })
})

app.get('/room/:roomId', (req, res) => {
  const { roomId } = req.params

  if (!roomObjects[roomId]) {
    return res.sendStatus(404)
  }

  res.sendStatus(200)
})

function getRoomId ({ request }: Socket) {
  /*
   * No need to provide a real base URL since we're only using `url` to extract the query
   * params from the relative path provided by request.url
   */
  const url = new URL(request.url as string, 'http://localhost')
  return url.searchParams.get('roomId')
}

io.on('connect', (socket: Socket) => {
  console.debug('Socket %s has connected', socket.id)

  const roomId = getRoomId(socket)
  if (!roomId) {
    socket.emit('ERROR', 'NO_ROOM_ID')
    socket.disconnect()
    console.warn('Disconnected socket %s, resason: no room ID found in query params', socket.id)
    return
  }

  // TODO add checking for nonexistent rooms

  socket.join(roomId)
  console.debug('Connected socket %s to room %s', socket.id, roomId)

  // The purpose of this is to just relay the message to all participants
  socket.on('BROADCAST', (payload: Record<string, unknown>) => {
    console.debug('Relayed %o to room %s', payload, roomId)
    socket.to(roomId).emit('BROADCAST', payload)
  })
})

server.listen(3000)