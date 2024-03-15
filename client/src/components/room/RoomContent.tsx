import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useConnectedUsers } from './hooks/connected-users.hook'
import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import { useMeasure } from 'react-use'
import PadContentRenderer from '../pad/PadContentRenderer'
import { PadInput } from '../pad/PadInput'

export default function RoomContent () {
  const users = useConnectedUsers()
  const userList = useMemo(() => {
    return sortBy(Object.values(users), ({ name }) => name)
  }, [users])
  const [ref, dimensions] = useMeasure<HTMLDivElement>()

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
        <div className='h-100 position-relative' ref={ref}>
          <div className='position-absolute'>
            <PadInput dimensions={dimensions} />
          </div>

          <PadContentRenderer dimensions={dimensions} />
        </div>
      </Col>
    </Row>
  </Container>
}