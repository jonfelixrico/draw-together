import { PadActions } from '@/modules/pad-common/pad.slice'
import { RectangleData } from '@/modules/pad-common/pad.types'
import { useUndoStackService } from '@/modules/pad-common/undo-stack.context'
import { RectangleInputService } from '@/modules/pad-service/rectangle-input-service.context'
import {
  PAD_SOCKET_EVENT,
  PadRequest,
  PadSocketCode,
} from '@/modules/pad-socket/pad-socket.types'
import { useSendMessage } from '@/modules/socket/room-socket.hook'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { nanoid } from 'nanoid'
import { useCallback, useRef } from 'react'

export function useRectangleInputServiceImpl(): RectangleInputService {
  const dispatch = useAppDispatch()
  const draft = useRef<RectangleData | null>(null)

  const { color, thickness } = useAppSelector(({ pad }) => pad.options)
  const { push } = useUndoStackService()
  const sendMessage = useSendMessage()

  const handler: RectangleInputService['emitDraw'] = useCallback(
    (event) => {
      if (event.isStart) {
        const data: RectangleData = {
          anchor: event.point,
          focus: event.point,
          color,
          thickness,
          timestamp: Date.now(),
          counter: 1,
          id: nanoid(),
        }

        /*
         * It's important that we create pass a shallow copy of the data instead of passing it directly.
         * Passing a shallow copy will end up causing writes to the draft ref to be blocked by React since
         * that same ref is being used in the state now.
         */
        dispatch(PadActions.setDraftRectangle({ ...data }))
        sendMessage(PadSocketCode.SHAPE_DRAFT_START, data)
        draft.current = data
      }

      if (event.isEnd) {
        const id = draft.current!.id
        draft.current!.counter++

        dispatch(PadActions.removeDraftRectangle(id))
        dispatch(
          PadActions.setRectangle({
            ...draft.current!,
            focus: event.point,
          })
        )

        push(({ store, socket }) => {
          store.dispatch(PadActions.removeRectangle(id))
          socket.emit(PAD_SOCKET_EVENT, {
            SHAPE_DELETE: {
              id,
            },
          } as PadRequest)
        })

        sendMessage(PadSocketCode.SHAPE_CREATE, draft.current!)

        draft.current = null
        return
      }

      const updated: RectangleData = {
        ...draft.current!,
        focus: event.point,
        counter: draft.current!.counter + 1,
      }

      dispatch(PadActions.setDraftRectangle({ ...updated }))
      sendMessage(PadSocketCode.SHAPE_DRAFT_MOVE, {
        counter: updated.counter,
        focus: updated.focus,
        id: updated.id,
      })
      draft.current = updated
    },
    [dispatch, thickness, color, push, sendMessage]
  )

  return {
    emitDraw: handler,
  }
}
