import PadPathsRenderer from '@/modules/pad/PadPathsRenderer'
import { PadInput } from '@/modules/pad/PadInput'
import PadCursorsRenderer from '@/modules/pad/PadCursorsRenderer'
import PadCursorUserInput from '@/modules/pad/PadCursorUserInput'
import PadOptionsThicknessWheelInput from '@/modules/pad/PadOptionsThicknessWheelInput'
import { Dimensions } from '@/modules/common/geometry.types'
import { useScaledDimensions } from '@/modules/common/scale-dimensions.hook'
import TransformScale from '@/modules/common/TransformScale'
import PadRectanglesRenderer from '@/modules/pad/PadRectanglesRenderer'

export function Pad({
  dimensions,
  scale,
}: {
  dimensions: Dimensions
  scale: number
}) {
  const scaledDims = useScaledDimensions(dimensions, scale)

  return (
    <PadCursorUserInput counterScale={scale}>
      <div
        className="position-relative isolate"
        style={scaledDims}
        data-cy="pad"
      >
        <div className="position-absolute" style={{ zIndex: 100 }}>
          <PadOptionsThicknessWheelInput>
            <PadInput dimensions={scaledDims} counterScale={scale} />
          </PadOptionsThicknessWheelInput>
        </div>

        <div
          className="position-absolute"
          style={{ zIndex: 1 }}
          data-cy="pad-paths-renderer"
        >
          <TransformScale scale={scale} dimensions={dimensions}>
            <div style={dimensions} className="position-relative">
              <PadPathsRenderer dimensions={dimensions} />
              <PadRectanglesRenderer dimensions={dimensions} />
            </div>
          </TransformScale>
        </div>

        <div
          className="position-absolute"
          style={{ zIndex: 2 }}
          data-cy="pad-cursors-renderer"
        >
          <PadCursorsRenderer dimensions={dimensions} scale={scale} />
        </div>
      </div>
    </PadCursorUserInput>
  )
}
