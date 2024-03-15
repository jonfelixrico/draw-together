import { SocketEventPayload } from "@/typings/socket.types";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

export function useSocketOn<T>(
  socket: Socket,
  eventType: string,
  eventCode: string,
  handler: (payload: T) => void
) {
  useEffect(() => {
    const wrapper = (ePayload?: SocketEventPayload<T>) => {
      if (ePayload?.code !== eventCode) {
        return
      }

      handler(ePayload.payload)
    }

    socket.on(eventType, wrapper)
    return () => {
      socket.off(eventType, wrapper)
    }
  }, [socket, eventType, eventCode, handler])
}
