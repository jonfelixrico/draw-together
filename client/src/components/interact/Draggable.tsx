import { useRef, useEffect } from 'react'
import interact from 'interactjs'
import { Point } from '../../typings/geometry.types'

export interface DragEvent extends Point {
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
  const elRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<Point | null>(null)

  useEffect(() => {
    if (!elRef.current) {
      return
    }

    const interactable = interact(elRef.current)
      .draggable({
        onstart: ({ x0, y0 }: Interact.InteractEvent<'drag', 'start'>) => {
          if (!elRef.current) {
            console.warn('Draggable: elRef is null!')
            return
          }

          const rect = elRef.current.getBoundingClientRect()
          const point = {
            x: x0 - rect.x,
            y: y0 - rect.y,
          }

          onDrag({
            ...point,
            isStart: true
          })
          prevRef.current = point
        },

        onend: ({ dx, dy }: Interact.InteractEvent<'drag', 'end'>) => {
          const prev = prevRef.current as Point // assume that this will never be null
          const point = {
            x: prev.x + dx,
            y: prev.y + dy
          }

          onDrag({
            ...point,
            isEnd: true
          })
        },

        onmove: ({ dx, dy }: Interact.InteractEvent<'drag', 'move'>) => {
          const prev = prevRef.current as Point // assume that this will never be null
          const point = {
            x: prev.x + dx,
            y: prev.y + dy
          }

          onDrag(point)
          prevRef.current = point
        },
      })

    return () => {
      interactable.unset()
    }
  }, [onDrag])

  return <div
    ref={elRef}
    style={dimensions}
  />
}