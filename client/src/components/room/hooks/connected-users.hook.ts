import { useCallback, useEffect, useMemo } from 'react'
import { useRoomSocket } from './room-socket.hook'
import pickBy from 'lodash/pickBy'
import { useSocketOn } from '@/hooks/socket.hook'
import {
  SERVER_SOCKET_EVENT,
  ServerReq,
  ServerResp,
  ServerSocketCode,
} from '@/typings/server-socket.types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { ConnectedParticipant, SocketActions } from '@/store/socket.slice'

export function useParticipantListener() {
  const dispatch = useAppDispatch()
  const setParticipants = useCallback(
    (participants: ConnectedParticipant[]) => {
      dispatch(SocketActions.setParticipants(participants))
    },
    [dispatch]
  )

  const setParticipant = useCallback(
    (participant: ConnectedParticipant) => {
      dispatch(SocketActions.setParticipant(participant))
    },
    [dispatch]
  )

  const socket = useRoomSocket()

  useEffect(() => {
    async function getList() {
      const { CONN_LIST } = (await socket.emitWithAck(SERVER_SOCKET_EVENT, {
        CONN_LIST: true,
      } as ServerReq)) as ServerResp

      if (!CONN_LIST) {
        return
      }

      setParticipants(
        CONN_LIST.map((p) => {
          return {
            ...p,
            /*
             * isConnected is hardcoded as true because CONN_LIST only shows users
             * which are connected, and not those who previously joined then left
             */
            isConnected: true,
          }
        })
      )
    }

    getList()
  }, [socket, setParticipants])

  const handler = useCallback(
    (payload: NonNullable<ServerResp[ServerSocketCode.CONN_ACTIVITY]>) => {
      const { action, ...participant } = payload
      setParticipant({
        ...participant,
        isConnected: action === 'join',
      })
    },
    [setParticipant]
  )

  useSocketOn(
    socket,
    SERVER_SOCKET_EVENT,
    ServerSocketCode.CONN_ACTIVITY,
    handler
  )
}

export function useConnectedUsers() {
  const participantsMap = useAppSelector((state) => state.socket.participants)
  return useMemo(
    () => pickBy(participantsMap, (p) => p.isConnected),
    [participantsMap]
  )
}
