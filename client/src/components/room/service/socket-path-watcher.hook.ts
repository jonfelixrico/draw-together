import { useAppDispatch } from '@/store/hooks'
import { PadPathActions } from '@/store/pad-path.slice'
import {
  PathCreatePayload,
  PathDraftMovePayload,
  PathDraftStartPayload,
  PadSocketCode,
} from '@/typings/pad-socket.types'
import { useMessageEffect } from '@/components/room/hooks/room-socket.hook'
import { useCallback } from 'react'

export function usePathSocketWatcher() {
  const dispatch = useAppDispatch()

  const pathCreateHandler = useCallback(
    (payload: PathCreatePayload) => {
      dispatch(PadPathActions.setPath(payload))
      dispatch(PadPathActions.removeDraftPath(payload.id))
    },
    [dispatch]
  )

  useMessageEffect(
    PadSocketCode.PATH_CREATE,
    pathCreateHandler
  )

  const pathDraftStartHandler = useCallback(
    (payload: PathDraftStartPayload) => {
      dispatch(PadPathActions.setDraftPath(payload))
    },
    [dispatch]
  )

  useMessageEffect(
    PadSocketCode.PATH_DRAFT_START,
    pathDraftStartHandler
  )

  const pathDraftMoveHandler = useCallback(
    ({ id, point }: PathDraftMovePayload) => {
      dispatch(
        PadPathActions.addPointToDraftPath({
          id,
          point,
        })
      )
    },
    [dispatch]
  )

  useMessageEffect(
    PadSocketCode.PATH_DRAFT_MOVE,
    pathDraftMoveHandler
  )
}
