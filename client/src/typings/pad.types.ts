import { Point } from "./geometry.types"

export interface PathData {
  points: Point[]
  color: React.SVGAttributes<SVGPathElement>['stroke']
  thickness: number
}
