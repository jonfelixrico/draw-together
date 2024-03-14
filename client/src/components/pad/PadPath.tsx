import { PadPath } from "../../typings/pad.types"

export default function Path ({
  points,
  color,
  thickness
}: PadPath) {
  const transformed: string[] = []

  const firstPoint = points[0]
  transformed.push(`M ${firstPoint.x},{${firstPoint.y}}`)
  for (const { x, y } of points) {
    transformed.push(`L ${x},${y}`)
  }
  transformed.push('Z')

  return <path
    d={transformed.join('\n')}
    fill={color}
    strokeWidth={thickness}
  />
}