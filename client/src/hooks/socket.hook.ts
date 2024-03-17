import { SocketEventPayload } from '@/typings/socket.types'
import { useCallback, useEffect } from 'react'
import { Socket } from 'socket.io-client'

export function useSocketOn<T>(
  socket: Socket,
  eventType: string,
  eventCode: string,
  handler: (payload: T) => void
) {
  useEffect(() => {
    const wrapper = (ePayload?: SocketEventPayload<T>) => {
      if (ePayload?.code !== eventCode) {
        return
      }

      handler(ePayload.payload)
    }

    socket.on(eventType, wrapper)
    return () => {
      socket.off(eventType, wrapper)
    }
  }, [socket, eventType, eventCode, handler])
}

function useSocketOnBase<T>(
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

export function useSocketOnV2<T extends Object>(
  socket: Socket,
  eventType: string,
  code: keyof T,
  handler: (payload: T[keyof T]) => void
) {
  const evtHandler = useCallback((payload: T) => {
    if (!payload[code]) {
      return
    }

    handler(payload[code])
  }, [eventType, handler])

  useSocketOnBase(socket, eventType, evtHandler)
}