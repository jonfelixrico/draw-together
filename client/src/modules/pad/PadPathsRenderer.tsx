import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import sortBy from 'lodash/sortBy'
import { Dimensions } from '@/modules/common/geometry.types'
import PadPath from './PadPath'

export default function PadPathsRenderer({
  dimensions,
}: {
  dimensions: Dimensions
}) {
  const draftPaths = useAppSelector((state) => state.pad.draftPaths)
  const paths = useAppSelector((state) => state.pad.paths)

  const pathsToRender = useMemo(() => {
    const arr = [...Object.values(paths), ...Object.values(draftPaths)]

    return sortBy(arr, ({ timestamp }) => timestamp)
  }, [draftPaths, paths])

  return (
    <div style={dimensions} className="position-relative">
      {pathsToRender.map((data) => {
        return (
          <div
            className="position-absolute"
            key={data.id}
            data-path-id={data.id}
          >
            <PadPath value={data} dimensions={dimensions} />
          </div>
        )
      })}
    </div>
  )
}
