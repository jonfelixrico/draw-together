import { useEffect } from "react";
import { useMessageEffect, useRoomSocket } from "./room-socket.hook";
import { RoomSocketCode, RoomSocketEvent } from "@/typings/room-socket-code.types";
import { useImmer } from 'use-immer'
import keyBy from 'lodash/keyBy'

interface ConnectedUser {
  id: string
  name: string
}

export function useConnectedUsers () {
  const [userMap, setUserMap] = useImmer<Record<string, ConnectedUser>>({})
  const socket = useRoomSocket()

  useEffect(() => {
    async function getList () {
      const list = await socket.emitWithAck(RoomSocketEvent.SERVER_REQ, {
        code: RoomSocketCode.CONN_LIST
      }) as ConnectedUser[]

      setUserMap(keyBy(list, ({ id }) => id))
    }

    getList()
  }, [socket, setUserMap])

  useMessageEffect(RoomSocketCode.CONN_ACTIVITY, (payload: { id: string, name: string, action: 'leave' | 'join' }) => {
    setUserMap((map) => {
      if (payload.action === 'leave') {
        delete map[payload.id]
        return
      }

      // reaching this point means the user joined
      map[payload.id] = {
        id: payload.id,
        name: payload.name
      }
    })
  }, [setUserMap])

  return userMap
}
