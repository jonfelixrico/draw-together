import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAppSelector } from '@/store/hooks'
import { RoomToolbarShareButton } from '@/modules/room/RoomToolbarShareButton'
import { RoomToolbarLeaveButton } from '@/modules/room/RoomToolbarLeaveButton'

export function RoomToolbar() {
  const title = useAppSelector((app) => app.room.name)

  return (
    <Row className="justify-content-between align-items-center">
      <Col xs="auto">
        <RoomToolbarLeaveButton />
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
