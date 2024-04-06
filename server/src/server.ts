import express from 'express'

import { createServer } from 'http'
import { Server } from 'socket.io'
import { socketIOHandler } from './socket-controllers/socket.controller'
import nocache from 'nocache'
import { initRestControllers } from '@/controllers'

export function initServer() {
  const app = express()
  const server = createServer(app)
  const io = new Server(server)

  app.use(nocache())

  initRestControllers(app)

  socketIOHandler(io)

  return server
}
