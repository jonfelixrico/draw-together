import { Dimensions, Point } from '@/modules/common/geometry.types'

const CURSOR_STROKE_WIDTH = 1
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
      style={dimensions}
      /*
       * overflow-clip is here because:
       * - translate can trigger the appearance of scrollbars -- we don't want that
       * - we don't want the cursors to appear outside of the boundary
       */
      className="position-relative overflow-clip"
    >
      <div
        className="position-absolute lh-0"
        style={{
          transform: `translate(${point.x}px, ${point.y}px)`,
        }}
      >
        <div
          style={{
            transform: 'translate(-50%, -50%)',
          }}
          className="d-inline-block"
        >
          <Cursor diameter={diameter} />
        </div>
      </div>

      <div
        className="position-absolute lh-0"
        style={{
          transform: `translate(${point.x + diameter / 2 + CURSOR_STROKE_WIDTH}px, ${point.y}px)`,
        }}
      >
        {label}
      </div>
    </div>
  )
}
