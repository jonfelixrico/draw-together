import { initServer } from '@/server'
import enableDestroy from 'server-destroy'

type InitReturnValue = {
  close(): Promise<void>
}

export function createAppInstance() {
  const httpServer = initServer()

  async function close() {
    await new Promise<void>((resolve, reject) => {
      httpServer.destroy((err) => {
        if (err) {
          return reject(err)
        }

        resolve()
      })
    })
  }

  return new Promise<InitReturnValue>((resolve, reject) => {
    try {
      enableDestroy(httpServer)
      httpServer.listen(3000, () => {
        resolve({
          close,
        })
      })
    } catch (e) {
      // calling server.listen can throw, hence we have a try-catch here
      reject(e)
    }
  })
}
