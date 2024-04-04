import { useCallback, useEffect } from 'react'
import { Socket } from 'socket.io-client'

function useSocketOnBase<T extends object>(
  socket: Socket,
  eventType: string,
  handler: (payload: T) => void
) {
  useEffect(() => {
    socket.on(eventType, handler)
    return () => {
      socket.off(eventType, handler)
    }
  }, [socket, eventType, handler])
}

export function useSocketOn<T extends object>(
  socket: Socket,
  eventType: string,
  code: keyof T,
  handler: (payload: T[keyof T]) => void
) {
  const evtHandler = useCallback(
    (payload: T) => {
      if (!payload[code]) {
        return
      }

      handler(payload[code])
    },
    [handler, code]
  )

  useSocketOnBase(socket, eventType, evtHandler)
}

/**
 * Wrapper for Socket#emit. This locks in the type of the payload to the one that
 * you specified.
 *
 * @param socket
 * @param eventType
 * @returns
 */
export function useSocketEmit<T extends object>(
  socket: Socket,
  eventType: string,
  code: keyof T
) {
  return useCallback(
    (payload: T[keyof T]) => {
      socket.emit(eventType, {
        [code]: payload,
      })
    },
    [socket, eventType, code]
  )
}
