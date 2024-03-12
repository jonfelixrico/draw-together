import Container from 'react-bootstrap/Container'

export default function RoomContent (props: {
  roomId: string
}) {
  return <Container>
    {props.roomId}
  </Container>
}