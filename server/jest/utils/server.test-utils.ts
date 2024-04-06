import { initServer } from '@/server'
import enableDestroy from 'server-destroy'

export async function createAppInstance() {
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

  await new Promise<void>((resolve, reject) => {
    try {
      enableDestroy(httpServer)
      httpServer.listen(3000, () => {
        resolve()
      })
    } catch (e) {
      // calling server.listen can throw, hence we have a try-catch here
      reject(e)
    }
  })

  return {
    close,
  }
}
