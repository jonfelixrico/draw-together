import { useCallback } from 'react'
import { Dimensions } from '@/typings/geometry.types'
import Draggable, { DraggableEvent } from '@/components/interact/Draggable'
import { usePathInputService } from './hooks/path-input.hook'

export function PadInput({ dimensions }: { dimensions: Dimensions }) {
  const { emitDraw } = usePathInputService()

  const handleDrag = useCallback(
    (event: DraggableEvent) => {
      const { x, y, isStart, isEnd } = event

      if (isStart) {
        emitDraw({
          point: {
            x,
            y,
          },
          isStart: true,
        })
      } else if (isEnd) {
        emitDraw({
          point: {
            x,
            y,
          },
          isEnd: true,
        })
      } else {
        emitDraw({
          point: {
            x,
            y,
          },
        })
      }
    },
    [emitDraw]
  )

  return (
    <Draggable dimensions={dimensions} onDrag={handleDrag} cursor="crosshair" />
  )
}
