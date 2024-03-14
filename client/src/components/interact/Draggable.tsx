import { useRef, useEffect, CSSProperties } from 'react'
import interact from 'interactjs'
import { Point } from '../../typings/geometry.types'

export interface DraggableEvent extends Point {
  isStart?: boolean
  isEnd?: boolean
}

interface PrevPoint extends Point {
  counter: number
}

export default function Draggable ({
  dimensions,
  onDrag,
  cursor,
  skipRate = 2
}: {
  onDrag: (event: DraggableEvent) => void
  
  dimensions: {
    width: number
    height: number
  }

  cursor?: CSSProperties['cursor']

  /**
   * Affects the move events. Higher value means less frequent move events are emitted to `onDrag`.
   * Higher value will make the line smoother, but at the risk of introducing more polygons.
   * Lower value will make the line smudgy, but there will be less polygons.
   */
  skipRate?: number
}) {
  const elRef = useRef<HTMLDivElement>(null)

  /*
   * We're using useRef here and not useState because the "prev" data does not need the reactiveness.
   * It's not something that we show in the UI. Plus, it'll just needlessly re-render the div that we're
   * using for input detection.
   */
  const prevRef = useRef<PrevPoint | null>(null)

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
          prevRef.current = {
            ...point,
            counter: 0
          }
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
          const prev = prevRef.current as PrevPoint // assume that this will never be null
          const point = {
            x: prev.x + dx,
            y: prev.y + dy
          }

          prevRef.current = {
            ...point,
            counter: prev.counter + 1
          }

          if (prev.counter % skipRate === 0) {
            onDrag(point)
          }
        },
      })
      .styleCursor(false)

    return () => {
      interactable.unset()
    }
  }, [onDrag, skipRate])

  return <div
    ref={elRef}
    style={{
      ...dimensions,
      cursor
    }}
  />
}