import { Dimensions } from '@/modules/common/geometry.types'
import PadContentRenderer from '@/modules/pad/PadContentRenderer'
import { PadInput } from '@/modules/pad/PadInput'

export function Pad({ dimensions }: { dimensions: Dimensions }) {
  return (
    <div className="position-relative" style={dimensions}>
      <div className="position-absolute" style={{ zIndex: 2 }} data-cy="pad">
        <PadInput dimensions={dimensions} />
      </div>

      <div className="position-absolute" style={{ zIndex: 1 }}>
        <PadContentRenderer dimensions={dimensions} />
      </div>
    </div>
  )
}
