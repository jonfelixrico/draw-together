import { initServer } from '@/server'
import { config } from 'dotenv'
config({
  path: ['.env.local', '.env'],
})

const server = initServer()
server.listen(3000)
