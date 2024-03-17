import { useMemo } from 'react'
import { PathRenderData } from '@/typings/pad.types'
import { Dimensions } from '@/typings/geometry.types'

export default function PadPath({ value, dimensions }: { value: PathRenderData, dimensions: Dimensions }) {
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
    <svg width={dimensions.width} height={dimensions.height}>
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
