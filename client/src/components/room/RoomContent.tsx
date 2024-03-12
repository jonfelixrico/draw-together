import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useRoomSocket } from './room-socket.hook'
import { useEffect } from 'react'
import { JoinedPayload, RoomSocketCode, UserDataPayload } from '../../typings/room-socket-code.types'
import { getClientUUID } from '../../utils/local-storage-vars.util'

export default function RoomContent () {
  const { broadcastMessage, socket, listenForMessage } = useRoomSocket()

  // UseEffect for cleanup
  useEffect(() => {
    return () => {
      console.log('Disconnected')
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    console.log('Sent init message')
    broadcastMessage(RoomSocketCode.JOINED, {
      uuid: getClientUUID()
    } as JoinedPayload)

    listenForMessage(RoomSocketCode.JOINED, ({ uuid }: JoinedPayload) => {
      console.log('Received JOINED message from %s. Sending user data.', uuid)
      broadcastMessage(RoomSocketCode.USER_DATA, {
        uuid: getClientUUID(),
        // TODO do something ismilar to getClientUUID
        name: window.localStorage.getItem('username') as string // casted as string since user can't reach this page without username in LS
      } as UserDataPayload)
    })
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