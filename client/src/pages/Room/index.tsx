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
import { Room } from '@/modules/common/room.types'
import { SocketIoError } from '@/modules/socket/socket.util'
import { getClientUUID } from '@/modules/common/local-storage-vars.util'
import { useUnmount } from 'react-use'
import { Socket } from 'socket.io-client'
import { PadEventsService } from '@/modules/pad-socket/pad-events'
import { useMount } from '@/hooks/lifecycle.hook'
import { createRoomSocket } from '@/modules/common/room-socket.util'
import store from '@/store'
import { UiActions } from '@/store/ui.slice'

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

    const socket = await createRoomSocket({
      roomId: params.roomId,
      clientId: getClientUUID(),
      name: username,
    })
    console.debug('Connected to room %s', params.roomId)

    const padEventsService = new PadEventsService(socket)

    return {
      room: data,
      socket,
      padEventsService,
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
      throw new RoomError(RoomErrorType.NOT_FOUND)
    }

    throw new RoomError(RoomErrorType.UNEXPECTED)
  } finally {
    store.dispatch(UiActions.setLoading(false))
  }
}

export function Component() {
  const { socket, padEventsService } = useLoaderData() as {
    socket: Socket
    padEventsService: PadEventsService
  }

  useUnmount(() => {
    return () => {
      console.log('Unmount detected, disconnecting socket.io id %s', socket.id)
      socket.disconnect()
    }
  })

  useMount(() => {
    console.info('Started the pad events service')
    padEventsService.start()
  })

  return <RoomContent />
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
