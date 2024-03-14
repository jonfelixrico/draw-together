import { useCallback } from 'react'
import { PathData } from '../../typings/pad.types'
import { If, Then } from 'react-if'
import PadPath from './PadPath'
import Draggable, { DragEvent } from '../interact/Draggable'
import { useImmer } from 'use-immer'

const DIMENSIONS = {
  width: 500,
  height: 500
}

export default function Pad () {
  const [path, setPath] = useImmer<PathData | null>(null)

  const handleDrag = useCallback((event: DragEvent) => {
    const {
      x,
      y,
      isEnd,
      isStart
    } = event

    if (isStart) {
      setPath({
        color: 'red',
        points: [{
          x,
          y
        }],
        thickness: 5
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
      <Draggable dimensions={DIMENSIONS} onDrag={handleDrag} cursor='crosshair' />
    </div>

    <If condition={!!path}>
      <Then>
        <div style={DIMENSIONS}>
          <svg {...DIMENSIONS}>
            <PadPath value={path as PathData} />
          </svg>
        </div>
      </Then>
    </If>
  </div>
}
