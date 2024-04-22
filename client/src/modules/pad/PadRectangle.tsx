import { Dimensions } from '@/modules/common/geometry.types'
import { RectangleRenderData } from '@/modules/pad-common/pad.types'
import { useMemo } from 'react'

export default function PadRectangle({
  dimensions,
  value: { anchor, focus, thickness, color },
}: {
  dimensions: Dimensions
  value: RectangleRenderData
}) {
  const svgProps = useMemo(() => {
    const [start, end] = [anchor, focus].sort((a, b) => {
      const left = a.x - b.y
      if (left) {
        return left
      }

      return a.y - b.y
    })

    return {
      ...start,
      width: end.x - start.x,
      height: end.y - start.y,
    }
  }, [anchor, focus])

  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <rect {...svgProps} strokeWidth={thickness} fill="none" stroke={color} />
    </svg>
  )
}
