import { useAppDispatch } from "@/store/hooks";
import { PadPathActions } from "@/store/pad-path.slice";
import { PathCreatePayload, PathDraftMovePayload, PathDraftStartPayload, PadSocketCode } from "@/typings/pad-socket.types";
import { useMessageEffect } from "@/components/room/hooks/room-socket.hook";

export function usePathSocketWatcher () {
  const dispatch = useAppDispatch()

  useMessageEffect(PadSocketCode.PATH_CREATE, (payload: PathCreatePayload) => {
    dispatch(PadPathActions.setPath(payload))
    dispatch(PadPathActions.removeDraftPath(payload.id))
  }, [dispatch])

  useMessageEffect(PadSocketCode.PATH_DRAFT_START, (payload: PathDraftStartPayload) => {
    dispatch(PadPathActions.setDraftPath(payload))
  }, [dispatch])

  useMessageEffect(PadSocketCode.PATH_DRAFT_MOVE, ({ id, point }: PathDraftMovePayload) => {
    dispatch(PadPathActions.addPointToDraftPath({
      id,
      point
    }))
  }, [dispatch])
}
