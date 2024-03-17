import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { sortBy } from 'lodash'
import { Dimensions } from '@/typings/geometry.types'
import PadPath from './PadPath'
import pick from 'lodash/pick'

export default function PadContentRenderer({
  dimensions,
}: {
  dimensions: Dimensions
}) {
  const { draftPaths, paths } = useAppSelector((state) => {
    return pick(state.padPath, ['draftPaths', 'paths'])
  })

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
            data-cy="path"
            data-path-id={data.id}
          >
            <PadPath value={data} dimensions={dimensions} />
          </div>
        )
      })}
    </div>
  )
}
