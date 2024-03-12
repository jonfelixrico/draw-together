import { useEffect, useRef } from "react";

export function useMount (fn: () => void) {
  const hasExecuted = useRef(false)

  useEffect(() => {
    if (hasExecuted.current) {
      return
    }

    fn()
    hasExecuted.current = true
  }, [])
}
