import { config } from 'dotenv'
config({
  path: ['.env.local', '.env'],
})

import express from 'express'

import { createServer } from 'http'
import { Server } from 'socket.io'
import { nanoid } from 'nanoid'
import { socketIOHandler } from './socket.controller'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (_, res) => {
  res.send('Hello World')
})

const roomObjects: Record<string, unknown> = {}

app.post('/room', (_, res) => {
  const id = nanoid()
  roomObjects[id] = {}

  res.json({
    id,
  })
})

app.get('/room/:roomId', (req, res) => {
  const { roomId } = req.params

  if (!roomObjects[roomId]) {
    return res.sendStatus(404)
  }

  res.sendStatus(200)
})

socketIOHandler(io)

server.listen(3000)
