import { useCallback, useEffect } from 'react'
import { useRoomSocket } from './room-socket.hook'
import { useImmer } from 'use-immer'
import keyBy from 'lodash/keyBy'
import { useSocketOn } from '@/hooks/socket.hook'
import {
  SERVER_SOCKET_EVENT,
  ServerReq,
  ServerResp,
  ServerSocketCode,
} from '@/typings/server-socket.types'

interface ConnectedUser {
  id: string
  name: string
}

export function useConnectedUsers() {
  const [userMap, setUserMap] = useImmer<Record<string, ConnectedUser>>({})
  const socket = useRoomSocket()

  useEffect(() => {
    async function getList() {
      const { CONN_LIST } = (await socket.emitWithAck(SERVER_SOCKET_EVENT, {
        CONN_LIST: true,
      } as ServerReq)) as ServerResp

      if (!CONN_LIST) {
        return
      }

      setUserMap(keyBy(CONN_LIST, ({ id }) => id))
    }

    getList()
  }, [socket, setUserMap])

  const handler = useCallback(
    (payload: NonNullable<ServerResp[ServerSocketCode.CONN_ACTIVITY]>) => {
      setUserMap((map) => {
        if (payload.action === 'leave') {
          delete map[payload.id]
          return
        }

        // reaching this point means the user joined
        map[payload.id] = {
          id: payload.id,
          name: payload.name,
        }
      })
    },
    [setUserMap]
  )

  useSocketOn(
    socket,
    SERVER_SOCKET_EVENT,
    ServerSocketCode.CONN_ACTIVITY,
    handler
  )

  return userMap
}
