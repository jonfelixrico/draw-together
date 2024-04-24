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
    const start = {
      x: Math.min(anchor.x, focus.x),
      y: Math.min(anchor.y, focus.y),
    }

    const end = {
      x: Math.max(anchor.x, focus.x),
      y: Math.max(anchor.y, focus.y),
    }

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
