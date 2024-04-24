import { useCallback } from 'react'
import { Dimensions } from '@/modules/common/geometry.types'
import { DraggableEvent } from './Draggable'
import { usePathInputService } from '@/modules/pad-service/path-input-service.context'
import { PadBaseInput } from '@/modules/pad/PadBaseInput'

export function PadPathInput({ dimensions }: { dimensions: Dimensions }) {
  const { emitDraw } = usePathInputService()

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

  return <PadBaseInput dimensions={dimensions} onDrag={handleDrag} />
}
