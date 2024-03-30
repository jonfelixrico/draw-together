import { Dimensions } from '@/modules/common/geometry.types'
import PadPathsRenderer from '@/modules/pad/PadPathsRenderer'
import { PadInput } from '@/modules/pad/PadInput'
import PadCursorsRenderer from '@/modules/pad/PadCursorsRenderer'

export function Pad({ dimensions }: { dimensions: Dimensions }) {
  return (
    <div className="position-relative" style={dimensions}>
      <div className="position-absolute" style={{ zIndex: 2 }} data-cy="pad">
        <PadInput dimensions={dimensions} />
      </div>

      <div className="position-absolute" style={{ zIndex: 1 }}>
        <PadPathsRenderer dimensions={dimensions} />
      </div>

      <div className="position-absolute" style={{ zIndex: 2 }}>
        <PadCursorsRenderer dimensions={dimensions} />
      </div>
    </div>
  )
}
