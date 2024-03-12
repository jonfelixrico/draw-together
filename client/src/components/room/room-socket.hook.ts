import { useLoaderData } from "react-router-dom";
import { Socket } from "socket.io-client";
import { RoomSocketCode } from "../../typings/room-socket-code.types";

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }

  function broadcastMessage (code: RoomSocketCode, payload?: unknown) {
    socket.emit('BROADCAST', {
      code,
      payload
    })
  }

  return {
    socket,
    broadcastMessage
  }
}