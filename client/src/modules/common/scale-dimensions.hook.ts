import { Dimensions } from '@/modules/common/geometry.types'
import { useMemo } from 'react'

export function useScaledDimensions(dimensions: Dimensions, scale: number) {
  return useMemo(() => {
    return {
      width: dimensions.width * scale,
      height: dimensions.height * scale,
    }
  }, [dimensions, scale])
}
