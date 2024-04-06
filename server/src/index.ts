import { config } from 'dotenv'
config({
  path: ['.env.local', '.env'],
})

import express from 'express'

import { createServer } from 'http'
import { Server } from 'socket.io'
import { socketIOHandler } from './socket-controllers/socket.controller'
import roomService from './services/room.service'
import nocache from 'nocache'
import manifest from '@/package.json'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.use(nocache())

app.get('/', (_, res) => {
  res.json({
    version: process.env.VERSION_OVERRIDE || manifest.version,
  })
})

app.post('/room', (_, res) => {
  const room = roomService.createRoom()

  res.json({
    id: room.roomId,
  })
})

app.get('/room/:roomId', (req, res) => {
  const { roomId } = req.params

  const room = roomService.getRoom(roomId)
  if (!room) {
    return res.sendStatus(404)
  }

  res.json({
    id: roomId,
    name: room.name,
  })
})

app.get('/room/:roomId/event/length', (req, res) => {
  const { roomId } = req.params

  const room = roomService.getRoom(roomId)
  if (!room) {
    return res.sendStatus(404)
  }

  res.json({
    length: room.history.length,
  })
})

app.get('/room/:roomId/event', (req, res) => {
  const { roomId } = req.params

  const room = roomService.getRoom(roomId)
  if (!room) {
    return res.sendStatus(404)
  }

  const { start, end } = req.query

  res.json(
    room.history.slice(parseInt(start as string), parseInt(end as string))
  )
})

socketIOHandler(io)

server.listen(3000)
