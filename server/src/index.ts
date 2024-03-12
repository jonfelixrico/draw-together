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
  const url = new URL(request.headers.host || 'http://localhost', request.url)
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

  socket.join(roomId)
  console.debug('Connected socket %s to room %s', socket.id, roomId)

  // The purpose of this is to just relay the message to all participants
  socket.on('BROADCAST', (payload: Record<string, unknown>) => {
    console.debug('Relayed %o to room %s', payload, roomId)
    socket.to(roomId).emit('BROADCAST', payload)
  })
})

app.listen(3000)
io.listen(3000)