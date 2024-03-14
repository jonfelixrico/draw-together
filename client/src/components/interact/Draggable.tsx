import { useRef, useEffect } from 'react'
import interact from 'interactjs'

interface DragEvent {
  x: number
  y: number
  dx: number
  dy: number
  isStart?: boolean
  isEnd?: boolean
}

export default function Draggable ({
  dimensions,
  onDrag
}: {
  onDrag: (event: DragEvent) => void
  
  dimensions: {
    width: number
    height: number
  }
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }

    const interactable = interact(ref.current)
      .draggable({
        onstart: (event: Interact.InteractEvent<'drag', 'start'>) => {
          onDrag({
            x: event.x0,
            y: event.y0,
            dx: event.dx,
            dy: event.dy,
            isStart: true
          })
        },

        onend: (event: Interact.InteractEvent<'drag', 'end'>) => {
          onDrag({
            x: event.x0,
            y: event.y0,
            dx: event.dx,
            dy: event.dy,
            isEnd: true
          })
        },

        onmove: (event: Interact.InteractEvent<'drag', 'move'>) => {
          onDrag({
            x: event.x0,
            y: event.y0,
            dx: event.dx,
            dy: event.dy
          })
        },
      })

    return () => {
      interactable.unset()
    }
  }, [onDrag])

  return <div
    ref={ref}
    style={dimensions}
  />
}