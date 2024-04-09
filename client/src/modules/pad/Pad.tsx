import PadPathsRenderer from '@/modules/pad/PadPathsRenderer'
import { PadInput } from '@/modules/pad/PadInput'
import PadCursorsRenderer from '@/modules/pad/PadCursorsRenderer'
import PadCursorUserInput from '@/modules/pad/PadCursorUserInput'
import PadOptionsThicknessWheelInput from '@/modules/pad/PadOptionsThicknessWheelInput'
import { useAppSelector } from '@/store/hooks'
import { usePadScale } from '@/modules/pad-common/pad-scale.hook'
import { useMemo } from 'react'
import { Dimensions } from '@/modules/common/geometry.types'
import TransformScale from '@/modules/common/TransformScale'

export function Pad() {
  const padDims = useAppSelector((state) => state.room.padDimensions)
  const scale = usePadScale()

  const scaledDims: Dimensions = useMemo(() => {
    return {
      width: padDims.width * scale,
      height: padDims.height * scale,
    }
  }, [padDims, scale])

  return (
    <PadCursorUserInput>
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

        <TransformScale containerDimensions={scaledDims} contentScale={scale}>
          <div style={padDims}>
            <div
              className="position-absolute"
              style={{ zIndex: 1 }}
              data-cy="pad-paths-renderer"
            >
              <PadPathsRenderer dimensions={padDims} />
            </div>

            <div
              className="position-absolute"
              style={{ zIndex: 2 }}
              data-cy="pad-cursors-renderer"
            >
              <PadCursorsRenderer dimensions={padDims} />
            </div>
          </div>
        </TransformScale>
      </div>
    </PadCursorUserInput>
  )
}
