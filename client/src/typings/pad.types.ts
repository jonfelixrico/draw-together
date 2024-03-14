interface Point {
  x: number
  y: number
}

export interface PathData {
  points: Point[]
  color: React.SVGAttributes<SVGPathElement>['fill']
  thickness: number
}
