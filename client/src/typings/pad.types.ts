import { Point } from "./geometry.types"

export interface PathRenderData {
  points: Point[]
  color: React.SVGAttributes<SVGPathElement>['stroke']
  thickness: number
}
