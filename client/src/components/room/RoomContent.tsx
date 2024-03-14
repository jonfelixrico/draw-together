import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useConnectedUsers } from './hooks/connected-users.hook'
import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import Pad from '../pad/Pad'
import { useMeasure } from 'react-use'

export default function RoomContent () {
  const users = useConnectedUsers()
  const userList = useMemo(() => {
    return sortBy(Object.values(users), ({ name }) => name)
  }, [users])
  const [ref, { width, height }] = useMeasure<HTMLDivElement>()

  return <Container data-cy="room-page" className='vh-100'>
    <Row className="h-100">
      <Col xs="2">
        <div>Connected Users</div>
        <ol>
          {userList.map(({ id, name }) => <li key={id}>{name}</li>)}
        </ol>
      </Col>
      <Col className='border p-0'>
        {/* Intermediate div is present because we can't easily attach ref to Col */}
        <div className='h-100' ref={ref}>
          <Pad dimensions={{ width, height }} />
        </div>
      </Col>
    </Row>
  </Container>
}