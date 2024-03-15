import { useCallback, useMemo } from "react";
import { useAppDispatch } from "../../store/hooks";
import { DrawEvent, PathInputService, PathInputServiceProvider } from "../pad/hooks/path-input.hook";
import { useSendMessage } from "./hooks/room-socket.hook";

export default function DrawServiceProvider () {
  const sendMessage = useSendMessage()
  const dispatch = useAppDispatch()

  const handleDraw = useCallback((event: DrawEvent) => {
    if (event.isStart) {

    } else if (event.isEnd) {

    } else {

    }
  }, [sendMessage, dispatch])

  const service: PathInputService = useMemo(() => {
    return {
      emitDraw: handleDraw
    }
  }, [handleDraw])

  return <PathInputServiceProvider value={service}>

  </PathInputServiceProvider>
}