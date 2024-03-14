import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useConnectedUsers } from './hooks/connected-users.hook'
import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import Pad from '../pad/Pad'

export default function RoomContent () {
  const users = useConnectedUsers()
  const userList = useMemo(() => {
    return sortBy(Object.values(users), ({ name }) => name)
  }, [users])

  return <Container data-cy="room-page">
    <Row>
      <Col xs="2">
        <div>Connected Users</div>
        <ol>
          {userList.map(({ id, name }) => <li key={id}>{name}</li>)}
        </ol>
      </Col>
      <Col>
        <Pad />
      </Col>
    </Row>
  </Container>
}