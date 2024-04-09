import PadPathsRenderer from '@/modules/pad/PadPathsRenderer'
import { PadInput } from '@/modules/pad/PadInput'
import PadCursorsRenderer from '@/modules/pad/PadCursorsRenderer'
import PadCursorUserInput from '@/modules/pad/PadCursorUserInput'
import PadOptionsThicknessWheelInput from '@/modules/pad/PadOptionsThicknessWheelInput'
import { useMemo } from 'react'
import { Dimensions } from '@/modules/common/geometry.types'
import TransformScale from '@/modules/common/TransformScale'

export function Pad({
  dimensions,
  scale,
}: {
  dimensions: Dimensions
  scale: number
}) {
  const scaledDims: Dimensions = useMemo(() => {
    return {
      width: dimensions.width * scale,
      height: dimensions.height * scale,
    }
  }, [dimensions, scale])

  return (
    <PadCursorUserInput scale={scale}>
      <div
        className="position-relative isolate"
        style={scaledDims}
        data-cy="pad"
      >
        <div className="position-absolute" style={{ zIndex: 100 }}>
          <PadOptionsThicknessWheelInput>
            <PadInput dimensions={scaledDims} />
          </PadOptionsThicknessWheelInput>
        </div>

        <div className="position-absolute">
          <TransformScale containerDimensions={scaledDims} contentScale={scale}>
            <div style={dimensions} className="position-relative">
              <div
                className="position-absolute"
                style={{ zIndex: 1 }}
                data-cy="pad-paths-renderer"
              >
                <PadPathsRenderer dimensions={dimensions} />
              </div>

              <div
                className="position-absolute"
                style={{ zIndex: 2 }}
                data-cy="pad-cursors-renderer"
              >
                <PadCursorsRenderer dimensions={dimensions} />
              </div>
            </div>
          </TransformScale>
        </div>
      </div>
    </PadCursorUserInput>
  )
}
