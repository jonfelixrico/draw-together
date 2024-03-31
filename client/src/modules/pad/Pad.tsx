import { Dimensions } from '@/modules/common/geometry.types'
import PadPathsRenderer from '@/modules/pad/PadPathsRenderer'
import { PadInput } from '@/modules/pad/PadInput'
import PadCursorsRenderer from '@/modules/pad/PadCursorsRenderer'
import PadCursorUserInput from '@/modules/pad/PadCursorUserInput'
import PadOptionThicknessWheelInput from '@/modules/pad/PadOptionThicknessWheelInput'

export function Pad({ dimensions }: { dimensions: Dimensions }) {
  return (
    <PadCursorUserInput>
      <div
        className="position-relative isolate"
        style={dimensions}
        data-cy="pad"
      >
        <div className="position-absolute" style={{ zIndex: 100 }}>
          <PadOptionThicknessWheelInput>
            <PadInput dimensions={dimensions} />
          </PadOptionThicknessWheelInput>
        </div>

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
    </PadCursorUserInput>
  )
}
