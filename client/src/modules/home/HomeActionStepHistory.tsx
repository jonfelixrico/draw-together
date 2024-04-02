import Card from 'react-bootstrap/Card'
import { Else, If, Then } from 'react-if'
import { useLiveQuery } from 'dexie-react-hooks'
import { roomDb } from '@/modules/room/room.db'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export default function HomeActionStepHistory() {
  const rooms = useLiveQuery(async () => {
    return await roomDb.rooms.toArray()
  })

  return (
    <Card>
      <Card.Body>
        <Row className="justify-content-between align-items-center mb-3">
          <Col xs="auto">
            <Card.Title>Join History</Card.Title>
          </Col>

          <Col xs="auto">
            <Button variant="secondary" onClick={() => roomDb.rooms.clear()}>
              Clear
            </Button>
          </Col>
        </Row>
        <If condition={rooms?.length}>
          <Then>
            <ListGroup>
              {rooms?.map((room) => (
                <ListGroup.Item>
                  <div>
                    <Link to={`/rooms/${room.id}`}>{room.name}</Link>
                  </div>
                  <div>Last opened {new Date(room.lastOpened).toString()}</div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Then>
          <Else>No items to show</Else>
        </If>
      </Card.Body>
    </Card>
  )
}
