import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useMount } from '../../hooks/lifecycle.hook'
import { useRoomSocket } from './room-socket.hook'

export default function RoomContent () {
  const socket = useRoomSocket()

  useMount(() => {
    // TODO do something
  })

  return <Container>
    <Row>
      <Col xs="2">
        Test
      </Col>
      <Col>
        Test 2
      </Col>
    </Row>
  </Container>
}