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

  const handleDrag = useCallback(({
    x,
    y,
    isEnd,
    isStart
  }: DragEvent) => {
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
      setPath(() => {
        return null
      })
    } else {
      if (!path) {
        return
      }

      path.points.push({
        x, y
      })
    }
  }, [setPath])

  return <div className='position-relative' style={DIMENSIONS}>
    <div>
      <If condition={!!path}>
        <Then>
          <PadPath value={path as PathData} />
        </Then>
      </If>
    </div>

    <div className='absolute'>
      <Draggable dimensions={DIMENSIONS} onDrag={handleDrag} />
    </div>
  </div>
}
