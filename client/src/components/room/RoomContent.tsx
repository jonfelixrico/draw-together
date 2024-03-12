import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useRoomSocket } from './room-socket.hook'
import { useEffect } from 'react'
import { RoomSocketCode } from '../../typings/room-socket-code.types'
import { getClientUUID } from '../../utils/local-storage-vars.util'

export default function RoomContent () {
  const { sendCode, socket } = useRoomSocket()

  useEffect(() => {
    sendCode(RoomSocketCode.JOINED, {
      uuid: getClientUUID()
    })

    return () => {
      console.log('Disconnected')
      socket.disconnect()
    }
  }, [])

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