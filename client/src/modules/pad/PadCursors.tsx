import { Dimensions, Point } from '@/modules/common/geometry.types'
import { useScaledDimensions } from '@/modules/common/scale-dimensions.hook'
import { PadCursor as IPadCursor } from '@/modules/pad-common/pad.types'
import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import { DataAttributes } from '@/modules/common/react.types'

const CURSOR_STROKE_WIDTH = 1
function CursorSvg({ diameter }: { diameter: number }) {
  const radius = diameter / 2
  const size = diameter + CURSOR_STROKE_WIDTH * 2

  return (
    <svg width={size} height={size} data-cy="cursor-svg">
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

function Cursor({
  point,
  dimensions,
  diameter,
  label,
  scale,
  ...dataAttrs
}: {
  dimensions: Dimensions
  point: Point
  diameter: number
  label: string
  scale: number
} & DataAttributes) {
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
      {...dataAttrs}
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
          <CursorSvg diameter={scaledDiameter} />
        </div>
      </div>

      <div
        className="position-absolute lh-0"
        style={{
          // The additional value to point.x is to make the label appear on the right of the cursor
          transform: `translate(${scaledPoint.x + scaledDiameter / 2 + CURSOR_STROKE_WIDTH}px, ${scaledPoint.y}px)`,
        }}
        data-cy="label"
      >
        {label}
      </div>
    </div>
  )
}

export default function PadCursors({
  dimensions,
  hideCursorThreshold = 7_000,
  scale,
  cursorData,
  nameData,
  defaultDiameter,
  currentTime,
}: {
  dimensions: Dimensions
  scale: number

  cursorData: Record<string, IPadCursor>
  nameData: Record<string, string>
  defaultDiameter: number

  /**
   * Time in millis
   * This is intended to represent the current time, and is intended to work with the "age"
   * of the cursors.
   */
  currentTime: number
  hideCursorThreshold?: number
}) {
  const cursorList = useMemo(() => {
    /*
     * To display, the "age" of the cursor data must be no longer than the time set in the props
     * No timestamp means that the cursor is immortal
     */
    const toDisplay = Object.values(cursorData).filter(
      ({ timestamp }) =>
        !timestamp || currentTime - timestamp < hideCursorThreshold
    )

    // We're sorting by id to keep the ordering consistent between recomputes
    return sortBy(toDisplay, ({ id }) => id)
  }, [cursorData, hideCursorThreshold, currentTime])

  const scaledDimensions = useScaledDimensions(dimensions, scale)

  /*
   * We're doing the scaling "manually" instead of relying on something like TransformScale
   * because we want the size of the names to remain native regardless of scale levels.
   */
  return (
    <div
      className="position-relative"
      style={scaledDimensions}
      data-cy="cursors"
    >
      {cursorList.map(({ id, point, diameter }) => {
        return (
          <div className="position-absolute" key={id}>
            <Cursor
              point={point}
              label={nameData[id] ?? 'Unknown'}
              dimensions={dimensions}
              diameter={diameter ?? defaultDiameter}
              scale={scale}
              data-cy="cursor"
              data-cursor-id={id}
            />
          </div>
        )
      })}
    </div>
  )
}
