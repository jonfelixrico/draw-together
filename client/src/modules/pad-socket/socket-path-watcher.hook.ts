import { useAppDispatch } from '@/store/hooks'
import { PadActions } from '@/modules/pad-service/pad.slice'
import {
  PathCreatePayload,
  PathDraftMovePayload,
  PathDraftStartPayload,
  PadSocketCode,
} from '@/modules/pad-socket/pad-socket.types'
import { useMessageEffect } from '@/modules/socket/room-socket.hook'
import { useCallback } from 'react'

export function usePathSocketWatcher() {
  const dispatch = useAppDispatch()

  const pathCreateHandler = useCallback(
    (payload: PathCreatePayload) => {
      dispatch(PadActions.setPath(payload))
      dispatch(PadActions.removeDraftPath(payload.id))
    },
    [dispatch]
  )

  useMessageEffect(PadSocketCode.PATH_CREATE, pathCreateHandler)

  const pathDraftStartHandler = useCallback(
    (payload: PathDraftStartPayload) => {
      dispatch(PadActions.setDraftPath(payload))
    },
    [dispatch]
  )

  useMessageEffect(PadSocketCode.PATH_DRAFT_START, pathDraftStartHandler)

  const pathDraftMoveHandler = useCallback(
    ({ id, point }: PathDraftMovePayload) => {
      dispatch(
        PadActions.addPointToDraftPath({
          id,
          point,
        })
      )
    },
    [dispatch]
  )

  useMessageEffect(PadSocketCode.PATH_DRAFT_MOVE, pathDraftMoveHandler)
}
