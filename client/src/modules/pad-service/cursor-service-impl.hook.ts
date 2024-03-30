import { useClientId } from '@/modules/common/client-id.hook'
import { PadActions } from '@/modules/pad-common/pad.slice'
import { CursorService } from '@/modules/pad-service/cursor-service.context'
import { useAppDispatch } from '@/store/hooks'
import { useCallback } from 'react'

export function useCursorServiceImpl(): CursorService {
  const userId = useClientId()
  const dispatch = useAppDispatch()

  const setUserCursor: CursorService['setUserCursor'] = useCallback(
    (point) => {
      dispatch(
        PadActions.setCursor({
          id: userId,
          point,
          timestamp: Date.now(),
        })
      )
    },
    [dispatch, userId]
  )

  return {
    setUserCursor,
  }
}
