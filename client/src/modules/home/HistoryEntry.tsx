import { RoomDbRecord } from '@/modules/common/db'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import BasicModal from '@/modules/common/BasicModal'

export default function HistoryEntry({
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
        data-cy="delete-entry-modal"
      >
        Are you sure you want to delete {room.name} from your history?
      </BasicModal>

      <Row data-cy="entry" data-room-id={room.id}>
        <Col>
          <div className="h5">{room.name}</div>
          <div>Last opened {new Date(room.lastOpened).toString()}</div>
        </Col>

        <Col
          xs="auto"
          className="d-flex flex-row justify-content-center align-items-center gap-2"
        >
          <Button
            variant="danger"
            size="sm"
            onClick={() => setShow(true)}
            data-cy="delete"
          >
            Delete
          </Button>

          <Button href={`/rooms/${room.id}`} size="sm">
            Join Room
          </Button>
        </Col>
      </Row>
    </>
  )
}
