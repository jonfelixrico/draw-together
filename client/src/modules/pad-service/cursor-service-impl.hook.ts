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
import { useCallback, useEffect, useRef } from 'react'
import { Point } from '@/modules/common/geometry.types'

export function useCursorServiceImpl(): CursorService {
  const userId = useClientId()
  const dispatch = useAppDispatch()
  const thickness = useAppSelector((root) => root.pad.options.thickness)

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

  const latestPoint = useRef<Point | null>()

  const setUserCursor: CursorService['setUserCursor'] = useCallback(
    (point) => {
      dispatch(
        PadActions.setCursor({
          id: userId,
          point,
        })
      )

      emitCursor({
        diameter: thickness,
        id: userId,
        point,
      })

      latestPoint.current = point
    },
    [dispatch, userId, thickness, emitCursor]
  )

  const clearUserCursor: CursorService['clearUserCursor'] = useCallback(() => {
    dispatch(PadActions.clearCursor(userId))
    latestPoint.current = null
    // No socket operation is involved because we just let inactive cursors of other users expire (timestamp age)
  }, [dispatch, userId])

  // Thickness changes count as cursor emit since we also want to show this to other users
  useEffect(() => {
    const point = latestPoint.current

    if (!point) {
      return
    }

    emitCursor({
      diameter: thickness,
      id: userId,
      point,
    })
  }, [thickness, emitCursor, userId, latestPoint])

  return {
    setUserCursor,
    clearUserCursor,
  }
}
