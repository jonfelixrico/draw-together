import { useCallback } from 'react'
import { PathData } from '../../typings/pad.types'
import { If, Then } from 'react-if'
import PadPath from './PadPath'
import Draggable, { DraggableEvent } from '../interact/Draggable'
import { useImmer } from 'use-immer'
import { Dimensions } from '../../typings/geometry.types'

export default function Pad ({ dimensions }: {
  dimensions: Dimensions
}) {
  const [path, setPath] = useImmer<PathData | null>(null)

  const handleDrag = useCallback((event: DraggableEvent) => {
    const {
      x,
      y,
      isEnd,
      isStart
    } = event

    if (isStart) {
      setPath({
        // TODO make this user-settable
        color: 'red',
        thickness: 5,

        points: [{
          x,
          y
        }]
      })
    } else if (isEnd) {
      // setPath(null)
    } else {
      setPath((path) => {
        if (!path) {
          return
        }

        path.points.push({
          x, y
        })
      })
    }
  }, [setPath])

  return <div className='position-relative'>
    <div className='position-absolute'>
      <Draggable dimensions={dimensions} onDrag={handleDrag} cursor='crosshair' />
    </div>

    <If condition={!!path}>
      <Then>
        <div style={dimensions}>
          <svg {...dimensions}>
            <PadPath value={path as PathData} />
          </svg>
        </div>
      </Then>
    </If>
  </div>
}
