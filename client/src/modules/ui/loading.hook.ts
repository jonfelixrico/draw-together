import { useAppDispatch } from '@/store/hooks'
import { UiActions } from './ui.slice'
import { useCallback } from 'react'

export function useLoading() {
  const dispatch = useAppDispatch()

  const setLoading = useCallback(
    (isLoading: boolean) => {
      dispatch(UiActions.setLoading(isLoading))
    },
    [dispatch]
  )

  return {
    setLoading,
  }
}
