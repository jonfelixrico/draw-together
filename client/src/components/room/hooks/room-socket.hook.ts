import { Socket } from "socket.io-client"
import { BroadcastPayload, RoomSocketCode, RoomSocketEvent } from "../../../typings/room-socket-code.types"
import { useCallback, useEffect, useState } from "react"
import { useLoaderData } from "react-router-dom"

export function useRoomSocketManager () {
  const socket = useRoomSocket()
  
  const [lastMessage, setLastMessage] = useState<BroadcastPayload<unknown>>()

  const sendMessage = useCallback((code: RoomSocketCode, payload: unknown) => {
    socket.emit(RoomSocketEvent.BROADCAST, {
      code,
      payload
    } as BroadcastPayload)
    console.debug('Sent message with code %s and payload %o', code, payload)
  }, [socket])

  useEffect(() => {
    function handler (payload: BroadcastPayload<unknown>) {
      setLastMessage(payload)
    }

    socket.on(RoomSocketEvent.BROADCAST, handler)
    console.debug('Created socket.io listener for %s', RoomSocketEvent.BROADCAST)

    return () => {
      console.debug('Removed socket.io listener for %s', RoomSocketEvent.BROADCAST)
      socket.off(RoomSocketEvent.BROADCAST, handler)
    }
  }, [socket, setLastMessage])

  return {
    lastMessage,
    sendMessage
  }
}

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }
  return socket
}