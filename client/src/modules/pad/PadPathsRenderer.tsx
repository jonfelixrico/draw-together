import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { Dimensions } from '@/modules/common/geometry.types'
import PadPath from './PadPath'
import { PathData } from '@/modules/pad-common/pad.types'
import { shortenMillis } from '@/modules/common/datetime.utils'

function PadPaths({
  values,
  dimensions,
}: {
  values: Record<string, PathData>
  dimensions: Dimensions
}) {
  const asArray = useMemo(() => Object.values(values), [values])

  return (
    <>
      {asArray.map((data) => {
        return (
          <div
            className="position-absolute"
            key={data.id}
            data-path-id={data.id}
            style={{
              // We want to shorten the millis since zIndex is 32 bit (assumed spec)
              zIndex: shortenMillis(data.timestamp),
            }}
          >
            <PadPath value={data} dimensions={dimensions} />
          </div>
        )
      })}
    </>
  )
}

export default function PadPathsRenderer({
  dimensions,
}: {
  dimensions: Dimensions
}) {
  const draftPaths = useAppSelector((state) => state.pad.draftPaths)
  const paths = useAppSelector((state) => state.pad.paths)

  return (
    <>
      <PadPaths dimensions={dimensions} values={draftPaths} />
      <PadPaths dimensions={dimensions} values={paths} />
    </>
  )
}
