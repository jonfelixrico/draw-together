import { Socket } from "socket.io-client"
import { PadEventPayload, RoomSocketCode } from "@/typings/room-socket-code.types"
import { useCallback } from "react"
import { useLoaderData } from "react-router-dom"
import { SocketEventType } from "@/typings/socket.types"
import { useSocketOn } from "@/hooks/socket.hook"

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

export function useMessageEffect <T>(code: RoomSocketCode, handler: (payload: T) => void) {
  const socket = useRoomSocket()

  useSocketOn(socket, SocketEventType.PAD, code, handler)
}

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }
  return socket
}
