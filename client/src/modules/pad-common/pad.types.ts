import { Point } from '@/modules/common/geometry.types'

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

export type PadCursor = {
  point: Point
  id: string
  timestamp?: number
  /*
   * Business-logic-wise, no diameter = this is the cursor of the user
   * TODO improve this, this seems like code smell since it's implicit
   */
  diameter?: number
}
