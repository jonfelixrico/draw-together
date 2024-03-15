import { Socket } from "socket.io-client"
import { PadEventPayload, RoomSocketCode } from "@/typings/room-socket-code.types"
import { useCallback, useEffect } from "react"
import { useLoaderData } from "react-router-dom"
import { SocketEventType } from "@/typings/socket.types"

export function useSendMessage() {
  const socket = useRoomSocket()

  return useCallback(<T>(code: RoomSocketCode, payload: T) => {
    socket.emit(SocketEventType.PAD, {
      code,
      payload
    } as PadEventPayload<T>)
    console.debug('Sent message with code %s and payload %o', code, payload)
  }, [socket])
}

export function useMessageEffect <T>(code: RoomSocketCode, handler: (payload: T) => void, dependencies: unknown[]) {
  const socket = useRoomSocket()

  useEffect(() => {
    function internalHandler (sckPayload: PadEventPayload<T>) {
      if (sckPayload?.code !== code) {
        return
      }

      handler(sckPayload.payload)
    }

    socket.on(SocketEventType.PAD, internalHandler)
    console.debug('Created socket.io listener for %s', SocketEventType.PAD)

    return () => {
      console.debug('Removed socket.io listener for %s', SocketEventType.PAD)
      socket.off(SocketEventType.PAD, internalHandler)
    }
  }, [socket, handler, code, ...dependencies])
}

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }
  return socket
}