import { createContext, useContext } from 'react'
import { Point } from '@/modules/common/geometry.types'

export interface RectangleDrawEvent {
  point: Point
  isStart?: boolean
  isEnd?: boolean
}

/**
 * Facade/abstract for path input mechanisms
 */
export interface RectangleInputService {
  emitDraw(event: RectangleDrawEvent): void
}

const RectangleInputServiceContext = createContext<RectangleInputService>({
  emitDraw: () => {
    console.warn(
      'RectangleInput: emitDraw was called, but context was not provided'
    )
  },
})

/**
 * To be used at the ancestor level.
 * This will provide the implementation of `PathInputService`
 */
export const RectangleInputServiceProvider =
  RectangleInputServiceContext.Provider

export function usePathInputService() {
  return useContext(RectangleInputServiceContext)
}
