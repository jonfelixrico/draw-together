import { useCursorService } from '@/modules/pad-service/cursor-service.context'
import { ReactNode, useCallback } from 'react'

/**
 * Follows the dimensions of the content
 */
export default function PadCursorUserInput({
  children,
  counterScale,
}: {
  children: ReactNode
  counterScale: number
}) {
  const { setUserCursor, clearUserCursor } = useCursorService()

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (evt) => {
      setUserCursor({
        x: evt.nativeEvent.offsetX / counterScale,
        y: evt.nativeEvent.offsetY / counterScale,
      })
    },
    [setUserCursor, counterScale]
  )

  return (
    <div onMouseMoveCapture={handleMouseMove} onMouseLeave={clearUserCursor}>
      {children}
    </div>
  )
}
