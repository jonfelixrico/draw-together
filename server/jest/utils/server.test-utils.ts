import { initServer } from '@/server'

type InitReturnValue = {
  close(): Promise<void>
}

export function createAppInstance() {
  const { httpServer, socketServer } = initServer()

  async function close() {
    await new Promise<void>((resolve, reject) => {
      socketServer.close((err) => {
        if (err) {
          return reject(err)
        }

        resolve()
      })
    })

    await new Promise<void>((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          return reject(err)
        }

        resolve()
      })
    })
  }

  return new Promise<InitReturnValue>((resolve, reject) => {
    try {
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
