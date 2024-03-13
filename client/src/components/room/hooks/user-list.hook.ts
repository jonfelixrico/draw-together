import { useEffect } from "react";
import { useRoomSocket, useRoomSocketManager } from "./room-socket.hook";
import { RoomSocketCode, RoomSocketEvent } from "../../../typings/room-socket-code.types";
import { useImmer } from 'use-immer'

interface ConnectedUser {
  id: string
  name: string
}

export function useUserList () {
  const [list, setList] = useImmer<ConnectedUser[]>([])
  const socket = useRoomSocket()
  const { lastMessage } = useRoomSocketManager()

  useEffect(() => {
    async function getList () {
      const list = await socket.emitWithAck(RoomSocketEvent.SERVER_REQ, {
        code: RoomSocketCode.CONN_LIST
      }) as ConnectedUser[]

      setList(list)
    }

    getList()
  }, [socket, setList])

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
      if (idx === -1) {
        console.warn('Leave message received, but did not find id %s', payload.id)
        return
      }

      list.splice(idx, 1)
    })
  }, [lastMessage, setList])

  return list
}
