import { Point } from "../../typings/geometry.types";

export default function Freehand ({
  points,
  color,
  thickness
}: {
  points: Point[],
  thickness: number,
  color: React.SVGAttributes<SVGPathElement>['fill']
}) {
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