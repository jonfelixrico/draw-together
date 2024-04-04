import { useState } from 'react'
import BasicModal from '@/modules/common/BasicModal'
import Stack from 'react-bootstrap/Stack'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useCopyToClipboard } from 'react-use'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useAppSelector } from '@/store/hooks'

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

function ShareButton() {
  const [show, setShow] = useState(false)
  const { roomId } = useParams()
  const link = window.location.href
  const copy = useCopyToClipboard()[1]

  function copyCode() {
    copy(roomId as string)
    setShow(false)
    toast('The room code has been copied to the clipboard')
  }

  function copyUrl() {
    copy(link)
    setShow(false)
    toast('The join URL has been copied to the clipboard')
  }

  return (
    <>
      <Button size="sm" variant="primary" onClick={() => setShow(true)}>
        Share
      </Button>
      <BasicModal
        title="Share"
        show={show}
        onHide={() => {
          setShow(false)
        }}
      >
        <Stack gap={2}>
          <div>
            Invite your friends! They can join through the <em>room code</em> or
            the <em>join URL</em>. Click to copy.
          </div>
          <div>
            Room code:{' '}
            <strong onClick={copyCode} className="cursor-pointer text-primary">
              {roomId}
            </strong>
          </div>
          <div>
            Join URL:{' '}
            <strong onClick={copyUrl} className="cursor-pointer text-primary">
              {link}
            </strong>
          </div>
        </Stack>
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
        <ShareButton />
      </Col>
    </Row>
  )
}
