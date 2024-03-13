import { useLoaderData } from "react-router-dom"
import { Socket } from "socket.io-client"
import { BroadcastPayload, RoomSocketCode } from "../../typings/room-socket-code.types"
import { useCallback, useEffect, useState } from "react"

const EVENT_NAME = 'BROADCAST'

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }
  const [lastMessage, setLastMessage] = useState<BroadcastPayload<unknown>>()

  const sendMessage = useCallback((code: RoomSocketCode, payload: unknown) => {
    socket.emit(EVENT_NAME, {
      code,
      payload
    } as BroadcastPayload)
    console.debug('Sent message with code %s and payload %o', code, payload)
  }, [socket])

  useEffect(() => {
    function handler (payload: BroadcastPayload<unknown>) {
      setLastMessage(payload)
    }

    socket.on(EVENT_NAME, handler)
    console.debug('Created socket.io listener for %s', EVENT_NAME)

    return () => {
      console.debug('Removed socket.io listener for %s', EVENT_NAME)
      socket.off(EVENT_NAME, handler)
    }
  }, [socket, setLastMessage])

  return {
    lastMessage,
    sendMessage
  }
}