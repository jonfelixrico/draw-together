import { useCallback } from 'react'
import { Dimensions, Point } from '@/modules/common/geometry.types'
import Draggable, { DraggableEvent } from './Draggable'
import { usePathInputService } from '@/modules/pad-service/path-input-service.context'

export function PadInput({
  dimensions,
  counterScale,
}: {
  dimensions: Dimensions
  /**
   * This is pretty much a normal scale value.
   * Under the hood, this scale value is used to normalize the pad input points emitted.
   */
  counterScale: number
}) {
  const { emitDraw } = usePathInputService()

  const normalize = useCallback(
    (point: Point): Point => {
      return {
        x: point.x / counterScale,
        y: point.y / counterScale,
      }
    },
    [counterScale]
  )

  const handleDrag = useCallback(
    (event: DraggableEvent) => {
      const { x, y, isStart, isEnd } = event

      if (isStart) {
        emitDraw({
          point: normalize({
            x,
            y,
          }),
          isStart: true,
        })
      } else if (isEnd) {
        emitDraw({
          point: normalize({
            x,
            y,
          }),
          isEnd: true,
        })
      } else {
        emitDraw({
          point: normalize({
            x,
            y,
          }),
        })
      }
    },
    [emitDraw, normalize]
  )

  // Removing the cursor since we have implemented our own
  return <Draggable dimensions={dimensions} onDrag={handleDrag} cursor="none" />
}
