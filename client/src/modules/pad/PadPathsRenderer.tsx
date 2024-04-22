import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { Dimensions } from '@/modules/common/geometry.types'
import PadPath from './PadPath'
import { PathData } from '@/modules/pad-common/pad.types'
import { shortenMillis } from '@/modules/common/datetime.utils'
import { ClassName } from '@/modules/common/react.types'

type CommonProps = {
  dimensions: Dimensions
} & ClassName

function PadPaths({
  values,
  dimensions,
  className,
}: {
  values: Record<string, PathData>
} & CommonProps) {
  const asArray = useMemo(() => Object.values(values), [values])

  return (
    <>
      {asArray.map((data) => {
        return (
          <div
            className={className}
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

export default function PadPathsRenderer(props: CommonProps) {
  const draftPaths = useAppSelector((state) => state.pad.draftPaths)
  const paths = useAppSelector((state) => state.pad.paths)

  return (
    <>
      <PadPaths {...props} values={draftPaths} />
      <PadPaths {...props} values={paths} />
    </>
  )
}
