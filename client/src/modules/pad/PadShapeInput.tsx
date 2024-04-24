import { useCallback } from 'react'
import { Dimensions } from '@/modules/common/geometry.types'
import { DraggableEvent } from './Draggable'
import { PadBaseInput } from '@/modules/pad/PadBaseInput'
import { useRectangleInputServiceImpl } from '@/modules/pad-service/rectangle-input-service-impl.context'

export function PadShapeInput({
  dimensions,
  counterScale,
}: {
  dimensions: Dimensions
  counterScale: number
}) {
  const { emitDraw } = useRectangleInputServiceImpl()

  const handleDrag = useCallback(
    (event: DraggableEvent) => {
      const { x, y, ...others } = event
      emitDraw({
        point: {
          x,
          y,
        },
        ...others,
      })
    },
    [emitDraw]
  )

  return (
    <PadBaseInput
      dimensions={dimensions}
      onDrag={handleDrag}
      counterScale={counterScale}
    />
  )
}
