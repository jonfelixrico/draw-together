import Container from 'react-bootstrap/Container'
import { useParams } from 'react-router-dom'

export default function RoomContent () {
  const params = useParams<{ roomId: string }>()

  return <Container>
    {props.roomId}
  </Container>
}