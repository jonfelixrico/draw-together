import { useCallback, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { DrawEvent } from './path-input-service.context'
import { useSendMessage } from '@/modules/socket/room-socket.hook'
import { PathData } from '@/modules/pad-common/pad.types'
import { PadActions, selectColor, selectThickness } from './pad.slice'
import { nanoid } from 'nanoid'
import { PadSocketCode } from '@/modules/pad-socket/pad-socket.types'

export function usePathInputServiceImpl() {
  const color = useAppSelector(selectColor)
  const thickness = useAppSelector(selectThickness)

  const sendMessage = useSendMessage()
  const dispatch = useAppDispatch()
  const draftRef = useRef<PathData | null>(null)

  const handleDraw = useCallback(
    (event: DrawEvent) => {
      if (event.isStart) {
        const newDraft: PathData = {
          points: [event.point],
          color,
          thickness,
          timestamp: Date.now(),
          id: nanoid(),
        }

        dispatch(PadActions.setDraftPath(newDraft))
        sendMessage(PadSocketCode.PATH_DRAFT_START, {
          ...newDraft,
          counter: 0,
        })
        draftRef.current = newDraft
        return
      }

      const draft = draftRef.current
      if (!draft) {
        console.warn('No drafts were found for non-new draw event')
        return
      }

      const updated = {
        ...draft,
        points: [...draft.points, event.point],
      }
      sendMessage(PadSocketCode.PATH_DRAFT_MOVE, {
        id: updated.id,
        point: event.point,
        counter: updated.points.length - 2,
      })

      if (event.isEnd) {
        sendMessage(PadSocketCode.PATH_CREATE, updated)
        dispatch(PadActions.setPath(updated))
        dispatch(PadActions.removeDraftPath(draft.id))
      } else {
        // reaching this line means that we're processing regular move events
        dispatch(PadActions.setDraftPath(updated))
      }

      draftRef.current = updated
    },
    [sendMessage, dispatch, color, thickness]
  )

  return useMemo(() => {
    return {
      emitDraw: handleDraw,
    }
  }, [handleDraw])
}
