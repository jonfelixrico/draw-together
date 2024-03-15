import { ReactNode, useCallback, useMemo, useRef } from "react";
import { useAppDispatch } from "../../../store/hooks";
import { DrawEvent, PathInputService, PathInputServiceProvider } from "../../pad/hooks/path-input.hook";
import { useSendMessage } from "../hooks/room-socket.hook";
import { PathData } from "../../../typings/pad.types";
import { PadActions } from "../../../store/pad.slice";
import { nanoid } from "nanoid";

export default function DrawServiceProvider (props: {
  children: ReactNode
}) {
  const sendMessage = useSendMessage()
  const dispatch = useAppDispatch()
  const draftRef = useRef<PathData | null>(null)

  const handleDraw = useCallback((event: DrawEvent) => {
    if (event.isStart) {
      const newDraft: PathData = {
        points: [event.point],
        color: 'red',
        thickness: 5,
        timestamp: Date.now(),
        id: nanoid()
      }

      dispatch(PadActions.setDraftPath(newDraft))
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
      points: [
        ...draft.points,
        event.point
      ]
    }
    
    if (event.isEnd) {
      dispatch(PadActions.setPath(updated))
      dispatch(PadActions.removeDraftPath(draft.id))
    } else {
      // reaching this line means that we're processing regular move events
      dispatch(PadActions.setDraftPath(updated))
    }

    draftRef.current = updated
  }, [sendMessage, dispatch])

  const service: PathInputService = useMemo(() => {
    return {
      emitDraw: handleDraw
    }
  }, [handleDraw])

  return <PathInputServiceProvider value={service}>
    {props.children}
  </PathInputServiceProvider>
}
