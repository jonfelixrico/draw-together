import { Socket } from 'socket.io-client'
import {
  PAD_SOCKET_EVENT,
  PadResponse,
} from '@/modules/pad-socket/pad-socket.types'
import { useCallback, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'
import { usePadEvents } from '@/modules/pad-socket/pad-events-v2.context'

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
  const padEvents = usePadEvents()

  useEffect(() => {
    const subscription = padEvents.subscribe((msg) => {
      const payload = msg[code]
      if (!payload) {
        return
      }

      handler(payload)
    })

    return () => subscription.unsubscribe()
  }, [padEvents, code, handler])
}

export function useRoomSocket() {
  const { socket } = useLoaderData() as { socket: Socket }
  return socket
}
