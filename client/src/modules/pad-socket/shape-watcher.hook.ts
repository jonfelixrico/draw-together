import { useAppDispatch } from '@/store/hooks'
import { PadActions } from '@/modules/pad-common/pad.slice'
import {
  PadSocketCode,
  ShapeCreatePayload,
  ShapeDraftStartPayload,
  ShapeDraftMovePayload,
  ShapeDeletePayload,
} from '@/modules/pad-socket/pad-socket.types'
import { useMessageEffect } from '@/modules/socket/room-socket.hook'
import { useCallback } from 'react'

export function useShapeSocketWatcher() {
  const dispatch = useAppDispatch()

  const shapeCreateHandler = useCallback(
    (payload: ShapeCreatePayload) => {
      console.debug('Socket: created shape %s', payload.id)
      dispatch(PadActions.removeDraftShape(payload.id))
      dispatch(PadActions.setShape(payload))
    },
    [dispatch]
  )
  useMessageEffect(PadSocketCode.SHAPE_CREATE, shapeCreateHandler)

  const shapeDraftStartHandler = useCallback(
    (payload: ShapeDraftStartPayload) => {
      dispatch(PadActions.setDraftShape(payload))
    },
    [dispatch]
  )
  useMessageEffect(PadSocketCode.SHAPE_DRAFT_START, shapeDraftStartHandler)

  const shapeDraftMoveHAndler = useCallback(
    ({ id, focus, counter }: ShapeDraftMovePayload) => {
      dispatch(
        PadActions.updateDraftShape({
          id,
          focus,
          counter,
        })
      )
    },
    [dispatch]
  )
  useMessageEffect(PadSocketCode.SHAPE_DRAFT_MOVE, shapeDraftMoveHAndler)

  const shapeDeleteHandler = useCallback(
    ({ id }: ShapeDeletePayload) => {
      console.debug('Socket: deleted shape %s', id)
      dispatch(PadActions.removeShape(id))
    },
    [dispatch]
  )
  useMessageEffect(PadSocketCode.SHAPE_DELETE, shapeDeleteHandler)
}
