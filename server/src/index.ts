import { config } from 'dotenv'
config({
  path: ['.env.local', '.env'],
})

import express from 'express'

import { createServer } from 'http'
import { Server } from 'socket.io'
import { socketIOHandler } from './socket-controllers/socket.controller'
import roomService from './services/room.service'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (_, res) => {
  res.send('Hello World')
})

app.post('/room', (_, res) => {
  const room = roomService.createRoom()

  res.json({
    id: room.roomId,
  })
})

app.get('/room/:roomId', (req, res) => {
  const { roomId } = req.params

  if (!roomService.getRoom(roomId)) {
    return res.sendStatus(404)
  }

  res.sendStatus(200)
})

socketIOHandler(io)

server.listen(3000)
