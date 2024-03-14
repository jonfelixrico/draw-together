import { useMemo } from "react"
import { PathData } from "../../typings/pad.types"

export default function PadPath ({ value }: { value: PathData}) {
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

  return <path
    d={pathCommands}
    stroke={color}
    strokeWidth={thickness}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
}