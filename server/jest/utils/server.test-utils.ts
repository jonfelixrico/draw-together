import { initServer } from '@/server'
import { Server } from 'http'

type InitReturnValue = {
  server: Server
  close(): Promise<void>
}

export function createAppInstance() {
  const server = initServer()

  function close() {
    return new Promise<void>((resolve, reject) => {
      server.close((err) => {
        if (err) {
          return reject(err)
        }

        resolve()
      })
    })
  }

  return new Promise<InitReturnValue>((resolve, reject) => {
    server.listen(3000, () => {
      resolve({
        server,
        close,
      })
    })

    setTimeout(() => {
      reject(new Error('Took too long to start'))
    }, 3_000)
  })
}
