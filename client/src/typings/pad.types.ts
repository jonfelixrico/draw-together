interface Point {
  x: number
  y: number
}

export interface PadPath {
  points: Point[]
  color: React.SVGAttributes<SVGPathElement>['fill']
  thickness: number
}
