import Container from 'react-bootstrap/Container'
import { useLoaderData, useParams } from 'react-router-dom'
import { Room } from '../../typings/room.types'
import { Socket } from 'socket.io-client'

interface LoaderData {
  room: Room
  socket: Socket
}

export default function RoomContent () {
  const params = useParams<{ roomId: string }>()
  const {
    room,
    socket
  } = useLoaderData() as LoaderData

  return <Container>
    {params.roomId}
  </Container>
}