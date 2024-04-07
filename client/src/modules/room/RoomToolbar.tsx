import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAppSelector } from '@/store/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import RoomToolbarLeaveButton from '@/modules/room/RoomToolbarLeaveButton'
import RoomToolbarShareButton from '@/modules/room/RoomToolbarShareButton'

export function RoomToolbar() {
  const title = useAppSelector((app) => app.room.name)
  const navigate = useNavigate()

  const { roomId } = useParams()

  return (
    <Row className="justify-content-between align-items-center">
      <Col xs="auto">
        <RoomToolbarLeaveButton onLeaveConfirm={() => navigate('/')} />
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
        <RoomToolbarShareButton url={window.location.href} roomId={roomId!} />
      </Col>
    </Row>
  )
}
