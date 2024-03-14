import { useRef, useEffect, CSSProperties } from 'react'
import interact from 'interactjs'
import { Point } from '../../typings/geometry.types'

export interface DragEvent extends Point {
  isStart?: boolean
  isEnd?: boolean
}

export default function Draggable ({
  dimensions,
  onDrag,
  cursor
}: {
  onDrag: (event: DragEvent) => void
  
  dimensions: {
    width: number
    height: number
  }

  cursor?: CSSProperties['cursor']
}) {
  const elRef = useRef<HTMLDivElement>(null)

  /*
   * We're using useRef here and not useState because the "prev" data does not need the reactiveness.
   * It's not something that we show in the UI. Plus, it'll just needlessly re-render the div that we're
   * using for input detection.
   */
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
      .styleCursor(false)

    return () => {
      interactable.unset()
    }
  }, [onDrag])

  return <div
    ref={elRef}
    style={{
      ...dimensions,
      cursor
    }}
  />
}