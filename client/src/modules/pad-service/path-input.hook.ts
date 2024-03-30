import { createContext, useContext } from 'react'
import { Point } from '@/modules/common/geometry.types'

export interface DrawEvent {
  point: Point
  isStart?: boolean
  isEnd?: boolean
}

export interface PathInputService {
  emitDraw(event: DrawEvent): void
}

const PathInputServiceContext = createContext<PathInputService>({
  emitDraw: () => {
    console.warn('emitDraw was called, but context was not provided')
  },
})

export const PathInputServiceProvider = PathInputServiceContext.Provider

export function usePathInputService() {
  return useContext(PathInputServiceContext)
}
