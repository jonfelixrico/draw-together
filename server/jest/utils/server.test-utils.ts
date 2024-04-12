import { initServer } from '@/server'
import { createHttpTerminator } from 'http-terminator'

export async function createAppInstance(port = 3000) {
  const httpServer = initServer()

  const terminator = createHttpTerminator({
    server: httpServer,
  })

  async function close() {
    terminator.terminate()
  }

  await new Promise<void>((resolve, reject) => {
    try {
      httpServer.listen(port, () => {
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
