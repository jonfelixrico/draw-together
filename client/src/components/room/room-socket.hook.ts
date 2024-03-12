import { useLoaderData } from "react-router-dom";
import { Socket } from "socket.io-client";
import { RoomSocketCode } from "../../typings/room-socket-code.types";

export function useRoomSocket () {
  const { socket } = useLoaderData() as { socket: Socket }

  function sendCode (code: RoomSocketCode, payload?: unknown) {
    // NOOP for now
  }

  return {
    socket,
    sendCode
  }
}