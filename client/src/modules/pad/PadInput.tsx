import { useCallback } from 'react'
import { Dimensions } from '@/modules/common/geometry.types'
import Draggable, { DraggableEvent } from './Draggable'
import { usePathInputService } from '@/modules/pad-service/path-input-service.context'

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

  // Removing the cursor since we have implemented our own
  return <Draggable dimensions={dimensions} onDrag={handleDrag} cursor="none" />
}
