import { Socket } from "socket.io-client"
import { BroadcastPayload, RoomSocketCode, RoomSocketEvent } from "@/typings/room-socket-code.types"
import { useCallback, useEffect } from "react"
import { useLoaderData } from "react-router-dom"

export function useSendMessage() {
  const socket = useRoomSocket()

  return useCallback(<T>(code: RoomSocketCode, payload: T) => {
    socket.emit(RoomSocketEvent.BROADCAST, {
      code,
      payload
    } as BroadcastPayload)
    console.debug('Sent message with code %s and payload %o', code, payload)
  }, [socket])
}

export function useMessageEffect <T>(code: RoomSocketCode, handler: (payload: T) => void, dependencies: unknown[]) {
  const socket = useRoomSocket()

  useEffect(() => {
    function internalHandler (sckPayload: BroadcastPayload<T>) {
      if (sckPayload?.code !== code) {
        return
      }

      handler(sckPayload.payload)
    }

    socket.on(RoomSocketEvent.BROADCAST, internalHandler)
    console.debug('Created socket.io listener for %s', RoomSocketEvent.BROADCAST)

    return () => {
      console.debug('Removed socket.io listener for %s', RoomSocketEvent.BROADCAST)
      socket.off(RoomSocketEvent.BROADCAST, internalHandler)
    }
  }, [socket, handler, code, ...dependencies])
}

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }
  return socket
}