import { createContext, useContext } from 'react'
import { Point } from '@/modules/common/geometry.types'

export interface DrawEvent {
  point: Point
  isStart?: boolean
  isEnd?: boolean
}

/**
 * Facade/abstract for path input mechanisms
 */
export interface PathInputService {
  emitDraw(event: DrawEvent): void
}

const PathInputServiceContext = createContext<PathInputService>({
  emitDraw: () => {
    console.warn('emitDraw was called, but context was not provided')
  },
})

/**
 * To be used at the ancestor level.
 * This will provide the implementation of `PathInputService`
 */
export const PathInputServiceProvider = PathInputServiceContext.Provider

export function usePathInputService() {
  return useContext(PathInputServiceContext)
}
