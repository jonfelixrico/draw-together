import { RoomDbRecord } from '@/modules/common/db'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import BasicModal from '@/modules/common/BasicModal'

export default function HistoryListEntry({
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
          variant: 'danger',
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
