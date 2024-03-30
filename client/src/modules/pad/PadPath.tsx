import { useMemo } from 'react'
import { PathRenderData } from './pad.types'
import { Dimensions } from '@/modules/common/geometry.types'

export default function PadPath({
  value,
  dimensions,
}: {
  value: PathRenderData
  dimensions: Dimensions
}) {
  const { points, color, thickness } = value

  const pathCommands = useMemo(() => {
    const transformed: string[] = []

    const firstPoint = points[0]
    transformed.push(`M ${firstPoint.x},${firstPoint.y}`)

    for (const { x, y } of points) {
      transformed.push(`L ${x},${y}`)
    }

    return transformed.join('\n')
  }, [points])

  return (
    <svg
      width={dimensions.width}
      height={dimensions.height}
      data-points-length={points.length}
      data-cy="rendered-path"
    >
      <path
        d={pathCommands}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
