import { getApiClient } from "../services/api-client";
import { LoaderFunction, useParams, useRouteError } from "react-router-dom";
import { HttpStatusCode, isAxiosError } from 'axios';
import { Case, Default, Switch } from 'react-if';
import RoomLoaderErrorNotFound from '../components/room/error-boundary/RoomLoaderErrorNotFound';
import RoomLoaderErrorNoName from '../components/room/error-boundary/RoomLoaderErrorNoName';
import RoomLoaderErrorUnexpected from '../components/room/error-boundary/RoomLoaderErrorUnexpected';
import RoomContent from '../components/room/RoomContent';

enum RoomErrorType {
  NO_USERNAME,

  UNEXPECTED,
  NOT_FOUND
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
    const { data } = await api.get(`room/${params.roomId}`)

    if (!window.localStorage.getItem('username')) {
      throw new RoomError(RoomErrorType.NO_USERNAME)
    }

    return data
  } catch (e) {
    if (e instanceof RoomError) {
      throw e
    }

    if (isAxiosError(e) && e.response?.status === HttpStatusCode.NotFound) {
      throw new RoomError(RoomErrorType.NOT_FOUND)
    }

    throw new RoomError(RoomErrorType.UNEXPECTED)
  }
}

export function Component () {
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