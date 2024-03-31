import { useCursorService } from '@/modules/pad-service/cursor-service.context'
import { ReactNode, useCallback } from 'react'

export default function PadCursorUserInput({
  children,
}: {
  children: ReactNode
}) {
  const { setUserCursor, clearUserCursor } = useCursorService()

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (evt) => {
      setUserCursor({
        x: evt.nativeEvent.offsetX,
        y: evt.nativeEvent.offsetY,
      })
    },
    [setUserCursor]
  )

  return (
    <div onMouseMoveCapture={handleMouseMove} onMouseLeave={clearUserCursor}>
      {children}
    </div>
  )
}
