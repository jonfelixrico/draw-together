/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useCallback, useContext } from 'react'
import { useImmer } from 'use-immer'
import appStore from '@/store'
import { Socket } from 'socket.io-client'
import { useRoomSocket } from '@/modules/socket/room-socket.hook'

/**
 * The stuff provided here MUST be atomic. It shouldn't be reactive.
 * If you provide a reactive value, you might end up having unexpected behaviors if the undo function
 * tries to reference it down the room lifecycle (i.e. several rerenders/recompute happened then the undo
 * function utilizes the reference of the service)
 */
interface UndoInjectables {
  store: typeof appStore
  socket: Socket
}

type UndoFn = (services: UndoInjectables) => Promise<void>

interface UndoStackService {
  push(fn: UndoFn): void
  undo(): Promise<void>
  stack: UndoFn[]
}

const DUMMY_SERVICE: UndoStackService = {
  push: () => {},
  undo: async () => {},
  stack: [],
}

const UndoStackContext = createContext(DUMMY_SERVICE)

export function UndoStackProvider({ children }: { children?: ReactNode }) {
  const [stack, setStack] = useImmer<UndoFn[]>([])
  const socket = useRoomSocket()

  const push: UndoStackService['push'] = useCallback(
    (undoFn) => {
      setStack((stack) => {
        stack.push(undoFn)
      })
    },
    [setStack]
  )

  const undo: UndoStackService['undo'] = useCallback(async () => {
    if (!stack.length) {
      return
    }

    const top = stack[stack.length - 1]
    setStack((stack) => {
      stack.pop()
    })

    /*
     * Socket is guaranteed to be render-safe, despite being provided via useRoomSocket.
     * A room will use the same socket reference throughout its lifecycle.
     */
    await top({ store: appStore, socket })
  }, [stack, setStack, socket])

  return (
    <UndoStackContext.Provider
      value={{
        undo,
        push,
        stack,
      }}
    >
      {children}
    </UndoStackContext.Provider>
  )
}

export function useUndoStackService() {
  const service = useContext(UndoStackContext)
  return service
}
