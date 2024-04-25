import { createContext, useContext } from 'react'
import { Point } from '@/modules/common/geometry.types'

export interface ShapeDrawEvent {
  point: Point
  isStart?: boolean
  isEnd?: boolean
}

/**
 * Facade/abstract for path input mechanisms
 */
export interface ShapeInputService {
  emitDraw(event: ShapeDrawEvent): void
}

const ShapeInputServiceContext = createContext<ShapeInputService>({
  emitDraw: () => {
    console.warn(
      'ShapeInput: emitDraw was called, but context was not provided'
    )
  },
})

/**
 * To be used at the ancestor level.
 * This will provide the implementation of `PathInputService`
 */
export const ShapeInputServiceProvider = ShapeInputServiceContext.Provider

export function useShapeInputService() {
  return useContext(ShapeInputServiceContext)
}
