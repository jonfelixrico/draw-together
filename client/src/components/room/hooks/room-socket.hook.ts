import { Socket } from 'socket.io-client'
import { PAD_SOCKET_EVENT, PadResponse } from '@/typings/pad-socket.types'
import { useCallback, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { PadEventsService } from '@/services/pad-events'

export function useSendMessage() {
  const socket = useRoomSocket()

  return useCallback(
    <T extends keyof PadResponse>(code: T, payload: PadResponse[T]) => {
      socket.emit(PAD_SOCKET_EVENT, {
        [code]: payload,
      })
      console.debug('Sent message with code %s and payload %o', code, payload)
    },
    [socket]
  )
}

export function useMessageEffect<T extends keyof PadResponse>(
  code: T,
  handler: (payload: NonNullable<PadResponse[T]>) => void
) {
  const { padEventsService } = useLoaderData() as {
    padEventsService: PadEventsService
  }

  useEffect(() => {
    const unsubscribe = padEventsService.on((msg) => {
      const payload = msg[code]
      if (!payload) {
        return
      }

      handler(payload)
    })

    return unsubscribe
  }, [padEventsService, code, handler])
}

export function useRoomSocket() {
  const { socket } = useLoaderData() as { socket: Socket }
  return socket
}
