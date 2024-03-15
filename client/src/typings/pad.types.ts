import { Point } from "./geometry.types"

export type PathColor = React.SVGAttributes<SVGPathElement>['stroke']

export interface PathRenderData {
  points: Point[]
  color: PathColor
  thickness: number
}

export interface PathData extends PathRenderData {
  id: string
  timestamp: number
}
