import { useCursorService } from '@/modules/pad-service/cursor-service.context'
import { ReactNode, useCallback, useRef } from 'react'

export default function PadCursorUserInput({
  children,
}: {
  children: ReactNode
}) {
  const { setUserCursor, clearUserCursor } = useCursorService()
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (evt) => {
      const el = ref.current
      if (!el) {
        return
      }

      const rect = el.getBoundingClientRect()
      setUserCursor({
        x: evt.clientX - rect.x,
        y: evt.clientY - rect.y,
      })
    },
    [setUserCursor]
  )

  return (
    <div ref={ref} onMouseMove={handleMouseMove} onMouseLeave={clearUserCursor}>
      {children}
    </div>
  )
}
