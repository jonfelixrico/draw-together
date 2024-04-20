/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useCallback, useContext } from 'react'
import { useImmer } from 'use-immer'
import appStore from '@/store'

interface UndoInjectables {
  store: typeof appStore
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

export function UndoStackProvider({
  children,
  store,
}: {
  children?: ReactNode
  store: typeof appStore
}) {
  const [stack, setStack] = useImmer<UndoFn[]>([])

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

    await top({ store })
  }, [stack, setStack, store])

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
