import Card from 'react-bootstrap/Card'
import { Else, If, Then } from 'react-if'
import { useLiveQuery } from 'dexie-react-hooks'
import { RoomDbRecord, roomDb } from '@/modules/room/room.db'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import BasicModal from '@/modules/common/BasicModal'

function HistoryEntry({
  room,
  onDelete,
}: {
  room: RoomDbRecord
  onDelete: () => void
}) {
  const [show, setShow] = useState(false)
  return (
    <>
      <BasicModal
        title="Delete"
        show={show}
        onHide={() => setShow(false)}
        onOk={() => {
          setShow(false)
          onDelete()
        }}
        ok={{
          label: 'Yes, delete',
        }}
        cancel={{
          label: 'No, cancel',
          emitHide: true,
        }}
      >
        Are you sure you want to delete {room.name} from your history?
      </BasicModal>

      <ListGroup.Item>
        <Row>
          <Col>
            <div className="h5">{room.name}</div>
            <div>Last opened {new Date(room.lastOpened).toString()}</div>
          </Col>
          <Col
            xs="auto"
            className="d-flex flex-row justify-content-center align-items-center gap-2"
          >
            <Button variant="danger" size="sm" onClick={() => setShow(true)}>
              Delete
            </Button>
            <Button href={`/rooms/${room.id}`} size="sm">
              Join Room
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    </>
  )
}

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
                <HistoryEntry
                  room={room}
                  key={room.id}
                  onDelete={() => deleteHistoryEntry(room.id)}
                />
              ))}
            </ListGroup>
          </Then>
          <Else>No items to show</Else>
        </If>
      </Card.Body>
    </Card>
  )
}
