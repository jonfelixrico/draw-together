import { useEffect } from "react";
import { useRoomSocket, useRoomSocketManager } from "./room-socket.hook";
import { RoomSocketCode } from "../../../typings/room-socket-code.types";
import { useImmer } from "use-immer"

interface ConnectedUser {
  id: string
  name: string
}

export function useUserList () {
  const [list, setList] = useImmer<ConnectedUser[]>([])
  const socket = useRoomSocket()
  const { lastMessage } = useRoomSocketManager()

  useEffect(() => {
    
  }, [socket])

  useEffect(() => {
    if (lastMessage?.code !== RoomSocketCode.CONN_ACTIVITY) {
      return
    }

    const payload = lastMessage.payload as { id: string, name: string, action: 'leave' | 'join' }

    setList((list) => {
      if (payload.action === 'join') {
        list.push({
          id: payload.id,
          name: payload.name
        })
        return
      }

      // reaching this line means that a user left

      const idx = list.findIndex(user => user.id === payload.id)
      list.splice(idx, 1)
    })
  }, [lastMessage, setList])

  return {
    list
  }
}
