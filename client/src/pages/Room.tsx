import Container from 'react-bootstrap/Container'
import { getApiClient } from "../services/api-client";
import { LoaderFunction, useParams, useRouteError } from "react-router-dom";
import { HttpStatusCode, isAxiosError } from 'axios';
import { Case, Default, Switch } from 'react-if';
import RoomLoaderErrorNotFound from '../components/room/error-boundary/RoomLoaderErrorNotFound';
import RoomLoaderErrorNoName from '../components/room/error-boundary/RoomLoaderErrorNoName';
import RoomLoaderErrorUnexpected from '../components/room/error-boundary/RoomLoaderErrorUnexpected';

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

  if (!window.localStorage.getItem('username')) {
    throw new RoomError(RoomErrorType.NO_USERNAME)
  }

  try {
    return await api.get(`room/${params.roomId}`)
  } catch (e) {
    if (isAxiosError(e) && e.status === HttpStatusCode.NotFound) {
      throw new RoomError(RoomErrorType.NOT_FOUND)
    }

    throw new RoomError(RoomErrorType.UNEXPECTED)
  }
}

export function Component () {
  const params = useParams<{ roomId: string }>()

  // This block shouldn't be possible. The loader should've taken care of it.
  if (!params.roomId) {
    throw new Error()
  }

  return <Container>
    In room {params.roomId}
  </Container>
}

export function ErrorBoundary () {
  const error = useRouteError() as RoomError

  return <Container className="vh-100">
    <Switch>
      <Case condition={error.type === RoomErrorType.NOT_FOUND}>
        <RoomLoaderErrorNotFound />
      </Case>

      <Case condition={error.type === RoomErrorType.NO_USERNAME}>
        <RoomLoaderErrorNoName />
      </Case>

      <Default>
        <RoomLoaderErrorUnexpected />
      </Default>
    </Switch>
  </Container>
}