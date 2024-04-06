import { Express } from 'express'

import manifest from '@manifest'
import { initRoomControllers } from '@/controllers/room.controller'

export function initRestControllers(app: Express) {
  app.get('/', (_, res) => {
    res.json({
      version: process.env.VERSION_OVERRIDE || manifest.version,
    })
  })

  initRoomControllers(app)
}
