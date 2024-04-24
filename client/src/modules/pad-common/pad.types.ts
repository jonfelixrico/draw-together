import { Point } from '@/modules/common/geometry.types'

export type SVGColor = React.SVGAttributes<SVGPathElement>['stroke']

export interface PathRenderData {
  points: Point[]
  color: SVGColor
  thickness: number
}

interface PadElementData {
  id: string
  timestamp: number
}

export type PathData = PathRenderData & PadElementData

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

export interface RectangleRenderData {
  anchor: Point
  focus: Point
  thickness: number
  color: SVGColor
}

export type RectangleData = RectangleRenderData & PadElementData

export type PadElementType = 'DRAW' | 'RECTANGLE'
