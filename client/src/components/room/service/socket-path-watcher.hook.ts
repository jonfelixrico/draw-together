import { useAppDispatch } from "../../../store/hooks";
import { PadActions } from "../../../store/pad.slice";
import { PathCreatePayload, RoomSocketCode } from "../../../typings/room-socket-code.types";
import { useMessageEffect } from "../hooks/room-socket.hook";

export function usePathSocketWatcher () {
  const dispatch = useAppDispatch()

  useMessageEffect(RoomSocketCode.PATH_CREATE, (payload: PathCreatePayload) => {
    dispatch(PadActions.setPath(payload))
  }, [dispatch])
}
