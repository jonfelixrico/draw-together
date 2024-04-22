import { Dimensions, Point } from '@/modules/common/geometry.types'
import { SVGColor } from '@/modules/pad-common/pad.types'
import { useMemo } from 'react'

interface Shape {
  anchor: Point
  focus: Point
  thickness: number
  color: SVGColor
}

export default function PadShape({
  dimensions,
  value: { anchor, focus, thickness, color },
}: {
  dimensions: Dimensions
  value: Shape
}) {
  const { x, y, width, height } = useMemo(() => {
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
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        strokeWidth={thickness}
        fill="none"
        stroke={color}
      />
    </svg>
  )
}
