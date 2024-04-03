import Card from 'react-bootstrap/Card'
import { Else, If, Then } from 'react-if'
import { useLiveQuery } from 'dexie-react-hooks'
import { roomDb } from '@/modules/room/room.db'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'

export default function HomeActionStepHistory() {
  const rooms = useLiveQuery(async () => {
    return await roomDb.rooms.toArray()
  })

  async function deleteHistoryEntry(id: string) {
    const results = await roomDb.rooms.where('id').equals(id).delete()
    if (results) {
      console.info('Room %s has been removed from the history', id)
    }
  }

  return (
    <Card>
      <Card.Body>
        <Row className="justify-content-between align-items-center mb-3">
          <Col xs="auto">
            <Card.Title>Join History</Card.Title>
          </Col>

          <Col xs="auto">
            <Button
              variant="danger"
              size="sm"
              onClick={() => roomDb.rooms.clear()}
            >
              Delete All
            </Button>
          </Col>
        </Row>
        <If condition={rooms?.length}>
          <Then>
            <ListGroup>
              {rooms?.map((room) => (
                <ListGroup.Item key={room.id}>
                  <Row>
                    <Col>
                      <div className="h5">{room.name}</div>
                      <div>
                        Last opened {new Date(room.lastOpened).toString()}
                      </div>
                    </Col>
                    <Col
                      xs="auto"
                      className="d-flex flex-row justify-content-center align-items-center gap-2"
                    >
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => deleteHistoryEntry(room.id)}
                      >
                        Delete
                      </Button>
                      <Button href={`/rooms/${room.id}`} size="sm">
                        Join Room
                      </Button>
                    </Col>
                  </Row>
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
