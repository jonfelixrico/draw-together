import { useCallback, useEffect } from 'react'
import { useRoomSocket } from './room-socket.hook'
import { useImmer } from 'use-immer'
import keyBy from 'lodash/keyBy'
import { SocketEventType } from '@/typings/socket.types'
import { useSocketOn } from '@/hooks/socket.hook'
import { ServerSocketCode } from '@/typings/server-socket.types'

interface ConnectedUser {
  id: string
  name: string
}

export function useConnectedUsers() {
  const [userMap, setUserMap] = useImmer<Record<string, ConnectedUser>>({})
  const socket = useRoomSocket()

  useEffect(() => {
    async function getList() {
      const list = (await socket.emitWithAck(SocketEventType.SERVER, {
        code: ServerSocketCode.CONN_LIST,
      })) as ConnectedUser[]

      setUserMap(keyBy(list, ({ id }) => id))
    }

    getList()
  }, [socket, setUserMap])

  const handler = useCallback(
    (payload: { id: string; name: string; action: 'leave' | 'join' }) => {
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
    SocketEventType.SERVER,
    ServerSocketCode.CONN_ACTIVITY,
    handler
  )

  return userMap
}
