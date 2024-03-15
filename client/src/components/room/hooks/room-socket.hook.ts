import { Socket } from "socket.io-client"
import { PadEventPayload, PadSocketCode } from "@/typings/pad-socket.types"
import { useCallback, useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { SocketEventType } from "@/typings/socket.types"
import { PadEventsService } from "@/services/pad-events"

export function useSendMessage() {
  const socket = useRoomSocket()

  return useCallback(<T>(code: PadSocketCode, payload: T) => {
    socket.emit(SocketEventType.PAD, {
      code,
      payload
    } as PadEventPayload<T>)
    console.debug('Sent message with code %s and payload %o', code, payload)
  }, [socket])
}

export function useMessageEffect <T>(code: PadSocketCode, handler: (payload: T) => void) {
  const { padEventsService } = useLoaderData() as { padEventsService: PadEventsService }

  useEffect(() => {
    const unsubscribe = padEventsService.on<T>(evt => {
      if (evt.code !== code) {
        return
      }

      handler(evt.payload)
    })

    return unsubscribe
  }, [padEventsService, code, handler])
}

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }
  return socket
}
