import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import sortBy from 'lodash/sortBy'
import { Dimensions } from '@/modules/common/geometry.types'
import PadPath from './PadPath'
import TransformScale from '@/modules/common/TransformScale'

export default function PadPathsRenderer({
  dimensions,
  scale,
}: {
  dimensions: Dimensions
  scale: number
}) {
  const draftPaths = useAppSelector((state) => state.pad.draftPaths)
  const paths = useAppSelector((state) => state.pad.paths)

  const pathsToRender = useMemo(() => {
    const arr = [...Object.values(paths), ...Object.values(draftPaths)]

    return sortBy(arr, ({ timestamp }) => timestamp)
  }, [draftPaths, paths])

  return (
    <TransformScale dimensions={dimensions} scale={scale}>
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
    </TransformScale>
  )
}
