import { useAppSelector } from '@/store/hooks'
import { Dimensions } from '@/modules/common/geometry.types'
import PadRectangle from '@/modules/pad/PadRectangle'
import { useMemo } from 'react'
import { RectangleData } from '@/modules/pad-common/pad.types'
import { shortenMillis } from '@/modules/common/datetime.utils'
import { ClassName } from '@/modules/common/react.types'

type CommonProps = {
  dimensions: Dimensions
} & ClassName

function Rectangles({
  values,
  dimensions,
  className,
}: {
  values: Record<string, RectangleData>
} & CommonProps) {
  const asArray = useMemo(() => Object.values(values), [values])
  return (
    <>
      {asArray.map((data) => (
        <div
          key={data.id}
          style={{
            // We want to shorten the millis since zIndex is 32 bit (assumed spec)
            zIndex: shortenMillis(data.timestamp),
          }}
          className={className}
        >
          <PadRectangle dimensions={dimensions} value={data} />
        </div>
      ))}
    </>
  )
}

export default function PadRectanglesRenderer(props: CommonProps) {
  const draft = useAppSelector((state) => state.pad.draftRectangles)
  const stable = useAppSelector((state) => state.pad.rectangles)

  return (
    <>
      <Rectangles {...props} values={draft} />
      <Rectangles {...props} values={stable} />
    </>
  )
}
