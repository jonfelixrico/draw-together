import { initServer } from '@/server'
import { Server } from 'http'

export function createAppInstance() {
  const server = initServer()
  return new Promise<Server>((resolve, reject) => {
    server.listen(3000, () => {
      resolve(server)
    })

    setTimeout(() => {
      reject(new Error('Took too long to start'))
    }, 3_000)
  })
}
