import { useCallback, useMemo } from 'react'
import PadPath from './PadPath'
import Draggable, { DraggableEvent } from '../interact/Draggable'
import { Dimensions } from '../../typings/geometry.types'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import sortBy from 'lodash/sortBy'
import { PadActions } from '../../store/pad.slice'
import { nanoid } from 'nanoid'

export default function Pad ({ dimensions }: {
  dimensions: Dimensions
}) {
  const { creatingPaths, paths } = useAppSelector(state => state.pad)
  const combinedPaths = useMemo(() => {
    const joined = [...Object.values(creatingPaths), ...Object.values(paths)]

    return sortBy(joined, ({ timestamp }) => timestamp)
  }, [creatingPaths, paths])

  const dispatch = useAppDispatch()

  const handleDrag = useCallback((event: DraggableEvent) => {
    const {
      x,
      y,
      isStart,
      isEnd
    } = event

    if (isStart) {
      dispatch(PadActions.createOwnCreatingPath({
        // TODO make this user-settable
        color: 'red',
        thickness: 5,

        points: [{
          x,
          y
        }],

        id: nanoid(),
        counter: 0,
        timestamp: Date.now()
      }))
    } else if (isEnd) {
      dispatch(PadActions.appendPointToOwnCreatingPath({ point: { x, y } }))
      dispatch(PadActions.saveOwnPath())
    } else {
      dispatch(PadActions.appendPointToOwnCreatingPath({ point: { x, y } }))
    }
  }, [dispatch])

  return <div className='position-relative'>
    <div className='position-absolute' style={{ zIndex: 2 }}>
      <Draggable dimensions={dimensions} onDrag={handleDrag} cursor='crosshair' />
    </div>

    <div style={dimensions}>
      {combinedPaths.map(data => {
        return <svg {...dimensions} key={data.id} className='position-absolute' style={{ zIndex: 1 }}>
          <PadPath value={data} />
        </svg>
      })}
    </div>
  </div>
}
