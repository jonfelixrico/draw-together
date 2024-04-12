import { Dimensions, Point } from '@/modules/common/geometry.types'
import { useScaledDimensions } from '@/modules/common/scale-dimensions.hook'
import { useMemo } from 'react'

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
  scale,
}: {
  dimensions: Dimensions
  point: Point
  diameter: number
  label: string
  scale: number
}) {
  const scaledDims = useScaledDimensions(dimensions, scale)

  const scaledDiameter = useMemo(() => scale * diameter, [scale, diameter])
  const scaledPoint = useMemo(() => {
    const { x, y } = point
    return {
      x: scale * x,
      y: scale * y,
    }
  }, [point, scale])

  return (
    <div
      style={scaledDims}
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
          transform: `translate(${scaledPoint.x}px, ${scaledPoint.y}px)`,
        }}
      >
        <div
          style={{
            transform: 'translate(-50%, -50%)',
          }}
          className="d-inline-block"
        >
          <Cursor diameter={scaledDiameter} />
        </div>
      </div>

      <div
        className="position-absolute lh-0"
        style={{
          // The additional value to point.x is to make the label appear on the right of the cursor
          transform: `translate(${scaledPoint.x + scaledDiameter / 2 + CURSOR_STROKE_WIDTH}px, ${scaledPoint.y}px)`,
        }}
      >
        {label}
      </div>
    </div>
  )
}
