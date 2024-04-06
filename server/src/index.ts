import { initServer } from '@/server'
import { config } from 'dotenv'
config({
  path: ['.env.local', '.env'],
})

const { httpServer } = initServer()
httpServer.listen(3000)
