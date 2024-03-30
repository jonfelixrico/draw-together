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
    <div
      style={{
        ...dimensions,
        // Important because we don't want the cursor to be out of bounds
        overflow: 'clip',
      }}
      className="position-relative"
    >
      <div
        className="position-absolute"
        style={{
          transform: `translate(${point.x}px, ${point.y}px)`,
          lineHeight: 0,
        }}
      >
        <div
          style={{
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'multiply',
          }}
          className="d-inline-block"
        >
          <Cursor diameter={diameter} />
        </div>
      </div>
      <div
        className="position-absolute"
        style={{
          transform: `translate(${point.x + diameter / 2 + CURSOR_STROKE_WIDTH}px, ${point.y}px)`,
          lineHeight: 0,
        }}
      >
        {label}
      </div>
    </div>
  )
}
