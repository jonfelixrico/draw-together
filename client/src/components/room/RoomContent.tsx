import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useUserList } from './hooks/user-list.hook'

export default function RoomContent () {
  const userList = useUserList()

  return <Container>
    <Row>
      <Col xs="2">
        {userList.map(({ id, name }) => {
          return <div key={id}>
            {id} {name}
          </div>
        })}
      </Col>
      <Col>
        Test 2
      </Col>
    </Row>
  </Container>
}