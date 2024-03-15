import { useAppDispatch } from "@/store/hooks";
import { PadPathActions } from "@/store/pad-path.slice";
import { PathCreatePayload, PathDraftMovePayload, PathDraftStartPayload, RoomSocketCode } from "@/typings/room-socket-code.types";
import { useMessageEffect } from "@/components/room/hooks/room-socket.hook";

export function usePathSocketWatcher () {
  const dispatch = useAppDispatch()

  useMessageEffect(RoomSocketCode.PATH_CREATE, (payload: PathCreatePayload) => {
    dispatch(PadPathActions.setPath(payload))
    dispatch(PadPathActions.removeDraftPath(payload.id))
  }, [dispatch])

  useMessageEffect(RoomSocketCode.PATH_DRAFT_START, (payload: PathDraftStartPayload) => {
    dispatch(PadPathActions.setDraftPath(payload))
  }, [dispatch])

  useMessageEffect(RoomSocketCode.PATH_DRAFT_MOVE, ({ id, point }: PathDraftMovePayload) => {
    dispatch(PadPathActions.addPointToDraftPath({
      id,
      point
    }))
  }, [dispatch])
}
