import { useState } from 'react'
import BasicModal from '@/modules/common/BasicModal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAppSelector } from '@/store/hooks'
import { RoomToolbarShareButton } from '@/modules/room/RoomToolbarShareButton'

function LeaveButton() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false)

  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setShow(true)}>
        Leave
      </Button>
      <BasicModal
        title="Leave Room"
        ok={{
          label: 'Yes',
        }}
        cancel={{
          label: 'No',
        }}
        show={show}
        onHide={() => {
          setShow(false)
        }}
        onCancel={() => {
          setShow(false)
        }}
        onOk={() => {
          setShow(false)
          navigate('/')
        }}
      >
        Are you sure you want to leave the room?
      </BasicModal>
    </>
  )
}

export function RoomToolbar() {
  const title = useAppSelector((app) => app.room.name)

  return (
    <Row className="justify-content-between align-items-center">
      <Col xs="auto">
        <LeaveButton />
      </Col>
      <Col>
        <Row className="align-items-center gx-2">
          <Col xs="auto">
            <div className="col-auto">Room name:</div>
          </Col>
          <Col xs="auto">
            <h1 className="h5 my-0 col-auto">{title}</h1>
          </Col>
        </Row>
      </Col>
      <Col xs="auto">
        <RoomToolbarShareButton />
      </Col>
    </Row>
  )
}
