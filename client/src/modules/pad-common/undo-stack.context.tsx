/* eslint-disable react-refresh/only-export-components */
import { AppDispatch } from '@/store'
import { useAppDispatch } from '@/store/hooks'
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
} from 'react'
import { useImmer } from 'use-immer'

interface UndoInjectables {
  dispatch: AppDispatch
}

type UndoFn = (services: UndoInjectables) => Promise<void>

interface UndoStackService {
  push(fn: UndoFn): void
  undo(): Promise<void>
}

const DUMMY_SERVICE: UndoStackService = {
  push: () => {},
  undo: async () => {},
}

const UndoStackContext = createContext(DUMMY_SERVICE)

export function UndoStackProvider({ children }: { children?: ReactNode }) {
  const [stack, setStack] = useImmer<UndoFn[]>([])
  const dispatch = useAppDispatch()

  const push: UndoStackService['push'] = useCallback(
    (undoFn) => {
      setStack((stack) => {
        stack.push(undoFn)
      })
    },
    [setStack]
  )

  const undo: UndoStackService['undo'] = useCallback(async () => {
    const top = stack[stack.length - 1]
    if (!top) {
      return
    }

    setStack((stack) => {
      stack.pop()
    })

    await top({ dispatch })
  }, [stack, setStack, dispatch])

  const service: UndoStackService = useMemo(() => {
    return {
      push,
      undo,
    }
  }, [push, undo])

  return (
    <UndoStackContext.Provider value={service}>
      {children}
    </UndoStackContext.Provider>
  )
}

export function useUndoStackService() {
  const service = useContext(UndoStackContext)
  return service
}
