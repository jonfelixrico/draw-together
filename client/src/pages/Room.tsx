import { getApiClient } from "../services/api-client";
import { LoaderFunction, useLoaderData, useParams, useRouteError } from "react-router-dom";
import { HttpStatusCode, isAxiosError } from 'axios';
import { Case, Default, Switch } from 'react-if';
import RoomLoaderErrorNotFound from '../components/room/error-boundary/RoomLoaderErrorNotFound';
import RoomLoaderErrorNoName from '../components/room/error-boundary/RoomLoaderErrorNoName';
import RoomLoaderErrorUnexpected from '../components/room/error-boundary/RoomLoaderErrorUnexpected';
import RoomContent from '../components/room/RoomContent';
import { Room } from "../typings/room.types";
import { SocketIoError, createSocket } from "../utils/socket-io.util";
import { getClientUUID } from "../utils/local-storage-vars.util";
import { useUnmount } from "react-use";
import { Socket } from "socket.io-client";

enum RoomErrorType {
  NO_USERNAME,

  UNEXPECTED,
  NOT_FOUND,

  SOCKET_CONNECT_ERROR
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

  try {
    const { data } = await api.get<Room>(`room/${params.roomId}`)

    if (!window.localStorage.getItem('username')) {
      throw new RoomError(RoomErrorType.NO_USERNAME)
    }

    const socket = await createSocket({
      query: {
        roomId: params.roomId,
        clientId: getClientUUID(),
        name: window.localStorage.getItem('username')
      },
      path: '/api/socket.io'
    })
    console.debug('Connected to room %s', params.roomId)

    return {
      room: data,
      socket
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
  }
}

export function Component () {
  const { socket } = useLoaderData() as { socket: Socket }

  useUnmount(() => {
    return () => {
      console.log('Unmount detected, disconnecting socket.io id %s', socket.id)
      socket.disconnect()
    }
  })

  return <RoomContent />
}

export function ErrorBoundary () {
  const error = useRouteError() as RoomError
  const params = useParams<{ roomId: string }>()

  return <div className='vh-100 d-flex justify-content-center align-items-center'>
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
}