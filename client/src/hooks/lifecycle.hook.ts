import { useEffect, useRef } from 'react'

/**
 * Use this instead of useEffect or any of its derivatives from react-use.
 * This useMount is sort of a hack to prevent React strict mode from breaking the app during development
 * due to it executing useEffect twice.
 *
 * @param fn
 */
export function useMount(fn: () => void) {
  /*
   * With regards to strict mode:
   *
   * Tried to use useState but it didn't work.
   */
  const hasExecuted = useRef(false)

  useEffect(
    () => {
      if (hasExecuted.current) {
        return
      }

      fn()
      hasExecuted.current = true
    },
    // Disabling this rule since after executing once, we don't care about the provided fn anymore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
}
