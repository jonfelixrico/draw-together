require('dotenv').config({
  path: ['.env.local', '.env']
})

import express from 'express'
import { nanoid } from 'nanoid'

const app = express()

app.get('/', (_, res) => {
  res.send('Hello World')
})

const roomObjects: Record<string, Object> = {}
app.post('/room', (_, res) => {
  const id = nanoid()
  roomObjects[id]
  
  res.json({
    id
  })
})

app.listen(3000)