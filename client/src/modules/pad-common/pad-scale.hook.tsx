import { useAppSelector } from '@/store/hooks'
import { useMemo } from 'react'

export function usePadScale() {
  const padDimensions = useAppSelector((state) => state.room.padDimensions)
  const viewportDimensions = useAppSelector(
    (state) => state.room.viewportDimensions
  )

  return useMemo(() => {
    const scaleViaWidth = viewportDimensions.width / padDimensions.width
    const scaleViaHeight = viewportDimensions.height / padDimensions.height

    return Math.min(scaleViaWidth, scaleViaHeight)
  }, [padDimensions, viewportDimensions])
}
