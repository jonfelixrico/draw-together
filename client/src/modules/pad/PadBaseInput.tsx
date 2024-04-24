import { useCallback } from 'react'
import Draggable, { DraggableEvent, DraggableProps } from './Draggable'
import { Point } from '@/modules/common/geometry.types'

export function PadBaseInput({
  dimensions,
  counterScale = 1,
  onDrag,
}: {
  /**
   * This is pretty much a normal scale value.
   * Under the hood, this scale value is used to normalize the pad input points emitted.
   */
  counterScale?: number
} & DraggableProps) {
  const normalize = useCallback(
    (point: Point): Point => {
      if (counterScale === 1) {
        return point
      }

      return {
        x: point.x / counterScale,
        y: point.y / counterScale,
      }
    },
    [counterScale]
  )

  const handleDrag = useCallback(
    (event: DraggableEvent) => {
      const { x, y, ...others } = event
      onDrag({
        ...others,
        ...normalize({ x, y }),
      })
    },
    [onDrag, normalize]
  )

  // Removing the cursor since we have implemented our own
  return <Draggable dimensions={dimensions} onDrag={handleDrag} cursor="none" />
}
