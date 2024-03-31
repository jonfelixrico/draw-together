import {
  CursorUpdatePayload,
  PAD_TRANSIENT_EVENT_TYPE,
  PadTransientRequest,
  PadTransientResponse,
  PadTransientSocketCode,
} from '@/modules/pad-socket/pad-transient-socket.types'
import { useClientId } from '@/modules/common/client-id.hook'
import { PadActions } from '@/modules/pad-common/pad.slice'
import { CursorService } from '@/modules/pad-service/cursor-service.context'
import { useRoomSocket } from '@/modules/socket/room-socket.hook'
import { useSocketEmit, useSocketOn } from '@/modules/socket/socket.hook'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useCallback } from 'react'

export function useCursorServiceImpl(): CursorService {
  const userId = useClientId()
  const dispatch = useAppDispatch()
  const diameter = useAppSelector((root) => root.pad.options.thickness)

  const cursorFromOtherUsersHandler = useCallback(
    (payload: CursorUpdatePayload) => {
      dispatch(
        PadActions.setCursor({
          ...payload,
          timestamp: Date.now(),
        })
      )
    },
    [dispatch]
  )

  const socket = useRoomSocket()
  useSocketOn<PadTransientResponse>(
    socket,
    PAD_TRANSIENT_EVENT_TYPE,
    PadTransientSocketCode.CURSOR_UPDATE,
    cursorFromOtherUsersHandler
  )

  const emitCursor = useSocketEmit<PadTransientRequest>(
    socket,
    PAD_TRANSIENT_EVENT_TYPE,
    PadTransientSocketCode.CURSOR_UPDATE
  )

  const setUserCursor: CursorService['setUserCursor'] = useCallback(
    (point) => {
      dispatch(
        PadActions.setCursor({
          id: userId,
          point,
          timestamp: Date.now(),
        })
      )

      emitCursor({
        diameter,
        id: userId,
        point,
      })
    },
    [dispatch, userId, diameter, emitCursor]
  )

  const clearUserCursor: CursorService['clearUserCursor'] = useCallback(() => {
    dispatch(PadActions.clearCursor(userId))
    // No socket operation is involved because we just let inactive cursors of other users expire (timestamp age)
  }, [dispatch, userId])

  return {
    setUserCursor,
    clearUserCursor,
  }
}
