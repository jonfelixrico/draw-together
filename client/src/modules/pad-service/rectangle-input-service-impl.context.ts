import { PadActions } from '@/modules/pad-common/pad.slice'
import { RectangleData } from '@/modules/pad-common/pad.types'
import { RectangleInputService } from '@/modules/pad-service/rectangle-input-service.context'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { nanoid } from 'nanoid'
import { useCallback, useRef } from 'react'

type RectangleDraft = RectangleData & { changeCount: number }

export function useRectangleInputServiceImpl(): RectangleInputService {
  const dispatch = useAppDispatch()
  const draft = useRef<RectangleDraft | null>(null)

  const { color, thickness } = useAppSelector(({ pad }) => pad.options)

  const handler: RectangleInputService['emitDraw'] = useCallback(
    (event) => {
      if (event.isStart) {
        const data: RectangleDraft = {
          anchor: event.point,
          focus: event.point,
          color,
          thickness,
          timestamp: Date.now(),
          changeCount: 0,
          id: nanoid(),
        }

        dispatch(PadActions.setDraftRectangle(data))
        draft.current = data
      }

      if (event.isEnd) {
        dispatch(PadActions.removeDraftRectangle(draft.current!.id))
        dispatch(
          PadActions.setRectangle({
            ...draft.current!,
            focus: event.point,
          })
        )

        draft.current = null
        return
      }

      const updated: RectangleDraft = {
        ...draft.current!,
        focus: event.point,
        changeCount: draft.current!.changeCount + 1,
      }

      dispatch(PadActions.setDraftRectangle(updated))
      draft.current = updated
    },
    [dispatch, thickness, color]
  )

  return {
    emitDraw: handler,
  }
}
