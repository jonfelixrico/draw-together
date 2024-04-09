import { useCursorService } from '@/modules/pad-service/cursor-service.context'
import { ReactNode, useCallback } from 'react'

export default function PadCursorUserInput({
  children,
  scale,
}: {
  children: ReactNode
  scale: number
}) {
  const { setUserCursor, clearUserCursor } = useCursorService()

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (evt) => {
      setUserCursor({
        x: evt.nativeEvent.offsetX * scale,
        y: evt.nativeEvent.offsetY * scale,
      })
    },
    [setUserCursor, scale]
  )

  return (
    <div onMouseMoveCapture={handleMouseMove} onMouseLeave={clearUserCursor}>
      {children}
    </div>
  )
}
