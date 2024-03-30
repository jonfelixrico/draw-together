import { ReactNode, useCallback, useMemo, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  DrawEvent,
  PathInputService,
  PathInputServiceProvider,
} from '@/modules/pad/path-input.hook'
import { useSendMessage } from '@/modules/socket/room-socket.hook'
import { PathData } from '@/modules/pad/pad.types'
import {
  PadPathActions,
  selectColor,
  selectThickness,
} from '@/store/pad-path.slice'
import { nanoid } from 'nanoid'
import { PadSocketCode } from '@/modules/pad-socket/pad-socket.types'

export default function DrawServiceProvider(props: { children: ReactNode }) {
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

        dispatch(PadPathActions.setDraftPath(newDraft))
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
        dispatch(PadPathActions.setPath(updated))
        dispatch(PadPathActions.removeDraftPath(draft.id))
      } else {
        // reaching this line means that we're processing regular move events
        dispatch(PadPathActions.setDraftPath(updated))
      }

      draftRef.current = updated
    },
    [sendMessage, dispatch, color, thickness]
  )

  const service: PathInputService = useMemo(() => {
    return {
      emitDraw: handleDraw,
    }
  }, [handleDraw])

  return (
    <PathInputServiceProvider value={service}>
      {props.children}
    </PathInputServiceProvider>
  )
}
