import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import sortBy from 'lodash/sortBy'
import { Dimensions } from '@/modules/common/geometry.types'
import PadPath from './PadPath'
import TransformScale from '@/modules/common/TransformScale'
import PadRectangle from '@/modules/pad/PadRectangle'

export default function PadPathsRenderer({
  dimensions,
  scale,
}: {
  dimensions: Dimensions
  scale: number
}) {
  const draft = useAppSelector((state) => state.pad.draftRectangles)
  const stable = useAppSelector((state) => state.pad.rectangles)

  const pathsToRender = useMemo(() => {
    const arr = [...Object.values(stable), ...Object.values(draft)]

    return sortBy(arr, ({ timestamp }) => timestamp)
  }, [draft, stable])

  return (
    <TransformScale dimensions={dimensions} scale={scale}>
      <div style={dimensions} className="position-relative">
        {pathsToRender.map((data) => (
          <div className="position-absolute" key={data.id}>
            <PadRectangle dimensions={dimensions} value={data} />
          </div>
        ))}
      </div>
    </TransformScale>
  )
}
