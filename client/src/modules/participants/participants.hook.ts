import { useCallback, useEffect } from 'react'
import { useRoomSocket } from '@/modules/socket/room-socket.hook'
import { useSocketOn } from '@/modules/socket/socket.hook'
import {
  SERVER_SOCKET_EVENT,
  ServerReq,
  ServerResp,
  ServerSocketCode,
} from '@/modules/socket/server-socket.types'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { RoomActions } from '@/modules/room/socket.slice'
import { Participant } from './participants.types'

export function useParticipantWatcher() {
  const dispatch = useAppDispatch()
  const setParticipants = useCallback(
    (participants: Participant[]) => {
      dispatch(RoomActions.setParticipants(participants))
    },
    [dispatch]
  )

  const setParticipant = useCallback(
    (participant: Participant) => {
      dispatch(RoomActions.setParticipant(participant))
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

export function useParticipants() {
  return useAppSelector((state) => state.socket.participants)
}
