import { PadActions } from '@/modules/pad-common/pad.slice'
import { PadElementType } from '@/modules/pad-common/pad.types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useCallback } from 'react'

export default function usePadActiveType() {
  const activeType = useAppSelector((state) => state.pad.activeType)
  const dispatch = useAppDispatch()

  const setActiveType = useCallback(
    (activeType: PadElementType) => {
      dispatch(PadActions.setActiveType(activeType))
    },
    [dispatch]
  )

  return {
    activeType,
    setActiveType,
  }
}
