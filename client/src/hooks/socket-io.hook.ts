import { useEffect, useState } from "react";
import { ManagerOptions, SocketOptions, io } from "socket.io-client";

export type Socket = ReturnType<typeof io>

export function useSocket (options: Partial<ManagerOptions & SocketOptions>) {
  const [socket, setSocket] = useState<Socket>()

  useEffect(() => {
    const sck = io(options)
    setSocket(sck)

    return () => {
      if (sck.connected) {
        sck.disconnect()
      }
    }
  }, [])

  return socket
}