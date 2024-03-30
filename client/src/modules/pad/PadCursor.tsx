import { Dimensions } from '@/modules/common/geometry.types'
import { BasePadCursor } from '@/modules/pad-common/pad.types'

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
  cursor,
  dimensions,
}: {
  dimensions: Dimensions
  cursor: BasePadCursor
}) {
  const { point, diameter, label } = cursor
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
