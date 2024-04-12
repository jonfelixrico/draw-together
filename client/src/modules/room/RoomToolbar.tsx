import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAppSelector } from '@/store/hooks'
import { useNavigate, useParams } from 'react-router-dom'
import RoomToolbarLeaveButton from '@/modules/room/RoomToolbarLeaveButton'
import RoomToolbarShareButton from '@/modules/room/RoomToolbarShareButton'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from 'react-use'
import { ReactNode, useCallback } from 'react'

export function RoomToolbar({ children }: { children?: ReactNode }) {
  const title = useAppSelector((app) => app.room.name)
  const navigate = useNavigate()

  const { roomId } = useParams()
  const copy = useCopyToClipboard()[1]

  const copyHandler = useCallback(
    (copied: string) => {
      copy(copied)
      toast(`Copied ${copied} to clipboard`)
    },
    [copy]
  )

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
      <Col
        xs="auto"
        className="d-flex flex-row justify-content-end items-align-center gap-2"
      >
        {children}

        <RoomToolbarShareButton
          url={window.location.href}
          roomId={roomId!}
          onCopy={copyHandler}
        />
      </Col>
    </Row>
  )
}
