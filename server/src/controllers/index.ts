import { Express } from 'express'

import roomService from '@/services/room.service'
import manifest from '@manifest'

export function initRestControllers(app: Express) {
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
}
