/* eslint-disable react-refresh/only-export-components */

import { getApiClient } from '@/modules/common/api-client'
import {
  LoaderFunction,
  useLoaderData,
  useParams,
  useRouteError,
} from 'react-router-dom'
import { HttpStatusCode, isAxiosError } from 'axios'
import { Case, Default, Switch } from 'react-if'
import RoomLoaderErrorNotFound from '@/pages/Room/error-boundary/RoomLoaderErrorNotFound'
import RoomLoaderErrorNoName from '@/pages/Room/error-boundary/RoomLoaderErrorNoName'
import RoomLoaderErrorUnexpected from '@/pages/Room/error-boundary/RoomLoaderErrorUnexpected'
import RoomContent from './RoomContent'
import { Room } from '@/modules/room/room.types'
import { SocketIoError } from '@/modules/socket/socket.util'
import { getClientUUID } from '@/modules/common/local-storage-vars.util'
import { Socket } from 'socket.io-client'
import { createRoomSocket } from '@/modules/common/room-socket.util'
import store from '@/store'
import { UiActions } from '@/modules/ui/ui.slice'
import { localDb } from '@/modules/common/db'
import { PadEventsProvider } from '@/modules/pad-socket/pad-events-v2.context'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { PadActions } from '@/modules/pad-common/pad.slice'
import { RoomActions } from '@/modules/room/room.slice'
import ToastProvider from '@/modules/common/ToastProvider'
import { UndoStackProvider } from '@/modules/pad-common/undo-stack.context'

enum RoomErrorType {
  NO_USERNAME,

  UNEXPECTED,
  NOT_FOUND,

  SOCKET_CONNECT_ERROR,
}

class RoomError extends Error {
  constructor(public type: RoomErrorType) {
    super(type.toString())
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const api = getApiClient()

  if (!params.roomId) {
    throw new RoomError(RoomErrorType.UNEXPECTED)
  }

  store.dispatch(UiActions.setLoading(true))
  try {
    const { data } = await api.get<Room>(`room/${params.roomId}`)
    const username = window.localStorage.getItem('username')

    if (!username) {
      throw new RoomError(RoomErrorType.NO_USERNAME)
    }

    const localRecord = await localDb.rooms
      .where('id')
      .equals(params.roomId)
      .first()
    if (!localRecord) {
      await localDb.rooms.add({
        id: params.roomId,
        lastOpened: Date.now(),
        name: data.name,
      })
    } else {
      await localDb.rooms.update(params.roomId, {
        lastOpened: Date.now(),
        name: data.name,
      })
    }

    const socket = await createRoomSocket({
      roomId: params.roomId,
      clientId: getClientUUID(),
      name: username,
    })
    console.debug('Connected to room %s', params.roomId)

    return {
      room: data,
      socket,
    }
  } catch (e) {
    if (e instanceof RoomError) {
      // Error is already processed, so we'll just throw it again
      throw e
    }

    if (e instanceof SocketIoError) {
      console.error('Encountered error while trying to connect to SocketIO', e)
      throw new RoomError(RoomErrorType.SOCKET_CONNECT_ERROR)
    }

    if (isAxiosError(e) && e.response?.status === HttpStatusCode.NotFound) {
      await localDb.rooms.delete(params.roomId)
      throw new RoomError(RoomErrorType.NOT_FOUND)
    }

    throw new RoomError(RoomErrorType.UNEXPECTED)
  } finally {
    store.dispatch(UiActions.setLoading(false))
  }
}

export function Component() {
  const { socket, room } = useLoaderData() as {
    socket: Socket
    room: Room
  }
  const { roomId } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    socket.connect()
    dispatch(RoomActions.setName(room.name))

    return () => {
      socket.disconnect()
      dispatch(PadActions.resetSlice())
      dispatch(RoomActions.resetSlice())
    }
  }, [socket, dispatch, room])

  return (
    <div data-cy="room-page">
      <PadEventsProvider socket={socket} roomId={roomId!}>
        <ToastProvider>
          <UndoStackProvider>
            <RoomContent />
          </UndoStackProvider>
        </ToastProvider>
      </PadEventsProvider>
    </div>
  )
}

export function ErrorBoundary() {
  const error = useRouteError() as RoomError
  const params = useParams<{ roomId: string }>()

  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <Switch>
        <Case condition={error.type === RoomErrorType.NOT_FOUND}>
          <RoomLoaderErrorNotFound />
        </Case>

        <Case condition={error.type === RoomErrorType.NO_USERNAME}>
          <RoomLoaderErrorNoName roomId={params.roomId as string} />
        </Case>

        <Default>
          <RoomLoaderErrorUnexpected />
        </Default>
      </Switch>
    </div>
  )
}
