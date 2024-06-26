import { useAppSelector } from '@/store/hooks'
import { Dimensions } from '@/modules/common/geometry.types'
import PadRectangle from '@/modules/pad/PadRectangle'
import { useMemo } from 'react'
import { ShapeData } from '@/modules/pad-common/pad.types'
import { shortenMillis } from '@/modules/common/datetime.utils'

function Rectangles({
  values,
  dimensions,
}: {
  values: Record<string, ShapeData>
  dimensions: Dimensions
}) {
  const asArray = useMemo(() => Object.values(values), [values])
  return (
    <>
      {asArray.map((data) => (
        <div
          className="position-absolute"
          key={data.id}
          style={{
            // We want to shorten the millis since zIndex is 32 bit (assumed spec)
            zIndex: shortenMillis(data.timestamp),
          }}
        >
          <PadRectangle dimensions={dimensions} value={data} />
        </div>
      ))}
    </>
  )
}

export default function PadShapesRenderer({
  dimensions,
}: {
  dimensions: Dimensions
}) {
  const draft = useAppSelector((state) => state.pad.draftShapes)
  const stable = useAppSelector((state) => state.pad.shapes)

  return (
    <>
      <Rectangles dimensions={dimensions} values={draft} />
      <Rectangles dimensions={dimensions} values={stable} />
    </>
  )
}
