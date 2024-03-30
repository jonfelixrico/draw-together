import { Dimensions, Point } from '@/modules/common/geometry.types'

const CURSOR_STROKE_WIDTH = 2
function Cursor({ diameter }: { diameter: number }) {
  const radius = diameter / 2
  const size = diameter + CURSOR_STROKE_WIDTH * 2

  return (
    <svg width={size} height={size}>
      <circle
        cx={radius + CURSOR_STROKE_WIDTH}
        cy={radius + CURSOR_STROKE_WIDTH}
        strokeWidth={CURSOR_STROKE_WIDTH}
        stroke="black"
        fill="none"
        r={radius}
      />
    </svg>
  )
}

export default function PadCursor({
  point,
  dimensions,
  diameter,
  label,
}: {
  dimensions: Dimensions
  point: Point
  diameter: number
  label: string
}) {
  return (
    <div style={dimensions}>
      <div
        style={{
          transformOrigin: 'center',
          transform: `translate(${point.x}px, ${point.y}px)`,
        }}
      >
        <Cursor diameter={diameter} />
      </div>
      <div
        style={{
          transformOrigin: 'left center',
          transform: `translate(${point.x}px, ${point.y}px)`,
        }}
      >
        {label}
      </div>
    </div>
  )
}
