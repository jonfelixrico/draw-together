import { Point } from '@/modules/common/geometry.types'
import { createContext, useContext } from 'react'

export interface CursorService {
  setUserCursor(point: Point): void
  clearUserCursor(): void
}

const CursorServiceContext = createContext<CursorService>({
  setUserCursor: () => {
    console.warn('Cursor service is not provided, but setUserCursor was called')
  },

  clearUserCursor: () => {
    console.warn(
      'Cursor service is not provided, but clearUserCursor was called'
    )
  },
})

export const CursorServiceProvider = CursorServiceContext.Provider

export function useCursorService() {
  return useContext(CursorServiceContext)
}
