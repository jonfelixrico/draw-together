import { Container } from "react-bootstrap";
import { getApiClient } from "../services/api-client";
import { LoaderFunction, useParams } from "react-router-dom";

enum RoomErrorType {
  NO_ROOM_ID,
  NO_USERNAME
}

class RoomError extends Error {
  constructor(public type: RoomErrorType) {
    super(type.toString())
  }
}

export const loader: LoaderFunction = async ({ params }) => {
  const api = getApiClient()

  if (!params.roomId) {
    throw new RoomError(RoomErrorType.NO_ROOM_ID)
  }

  if (!window.localStorage.getItem('username')) {
    throw new RoomError(RoomErrorType.NO_USERNAME)
  }

  return await api.get(`room/${params.roomId}`)
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
  return <Container>
    Error boundary
  </Container>
}