import { useAppDispatch } from "../../../store/hooks";
import { PadActions } from "../../../store/pad.slice";
import { PathCreatePayload, PathDraftMovePayload, PathDraftStartPayload, RoomSocketCode } from "../../../typings/room-socket-code.types";
import { useMessageEffect } from "../hooks/room-socket.hook";

export function usePathSocketWatcher () {
  const dispatch = useAppDispatch()

  useMessageEffect(RoomSocketCode.PATH_CREATE, (payload: PathCreatePayload) => {
    dispatch(PadActions.setPath(payload))
    dispatch(PadActions.removeDraftPath(payload.id))
  }, [dispatch])

  useMessageEffect(RoomSocketCode.PATH_DRAFT_START, (payload: PathDraftStartPayload) => {
    dispatch(PadActions.setDraftPath(payload))
  }, [dispatch])

  useMessageEffect(RoomSocketCode.PATH_DRAFT_MOVE, ({ id, point }: PathDraftMovePayload) => {
    dispatch(PadActions.addPointToDraftPath({
      id,
      point
    }))
  }, [dispatch])
}
