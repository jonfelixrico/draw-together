import { useLoaderData } from "react-router-dom";
import { Socket } from "socket.io-client";
import { BroadcastPayload, RoomSocketCode } from "../../typings/room-socket-code.types";

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }

  function broadcastMessage (code: RoomSocketCode, payload?: unknown) {
    socket.emit('BROADCAST', {
      code,
      payload
    })
  }

  function listenForMessage <T = unknown>(code: RoomSocketCode, handler: (payload: T) => void) {
    socket.on('BROADCAST', (broadcastPayload: BroadcastPayload<T>) => {
      if (code === broadcastPayload.code) {
        handler(broadcastPayload.payload)
      }
    })
  }

  return {
    socket,
    broadcastMessage,
    listenForMessage
  }
}