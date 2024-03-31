import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParticipantWatcher } from '@/modules/participants/participants.hook'
import { useCopyToClipboard, useMeasure } from 'react-use'
import { usePathSocketWatcher } from '@/modules/pad-socket/socket-path-watcher.hook'
import ParticipantsList from '@/modules/participants/ParticipantsList'
import { PathInputServiceProvider } from '@/modules/pad-service/path-input-service.context'
import { usePathInputServiceImpl } from '@/modules/pad-service/path-input-service-impl.hook'
import { Pad } from '@/modules/pad/Pad'
import { CursorServiceProvider } from '@/modules/pad-service/cursor-service.context'
import { useCursorServiceImpl } from '@/modules/pad-service/cursor-service-impl.hook'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from 'react-router-dom'
import PadOptionsControls from '@/modules/pad/PadOptionsControls'
import MobileScreenWarningModal from '@/pages/Room/MobileScreenWarningModal'
import { useState } from 'react'
import BasicModal from '@/modules/common/BasicModal'
import Stack from 'react-bootstrap/Stack'
import { toast } from 'react-toastify'

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

function Toolbar() {
  return (
    <Row className="justify-content-between align-items-center">
      <Col xs="auto">
        <LeaveButton />
      </Col>
      <Col xs="auto">
        <ShareButton />
      </Col>
    </Row>
  )
}

function Drawer() {
  return (
    <Row className="h-100 flex-column gy-3">
      <Col xs="auto">
        <div className="h6">Participants</div>
        <ParticipantsList />
      </Col>

      <div>
        <div className="border-bottom" />
      </div>

      <Col xs="auto">
        <div className="h6">Options</div>
        <PadOptionsControls />
      </Col>
    </Row>
  )
}

export default function RoomContent() {
  useParticipantWatcher()
  const [ref, dimensions] = useMeasure<HTMLDivElement>()
  usePathSocketWatcher()

  const pathInputService = usePathInputServiceImpl()
  const cursorService = useCursorServiceImpl()

  return (
    <>
      <MobileScreenWarningModal />
      <Container
        data-cy="room-page"
        className="vh-100"
        style={{
          // touch-action: none is required to make drawing work for touchscreen devices
          touchAction: 'none',
        }}
        fluid
      >
        <Row className="h-100 flex-column">
          <Col xs="auto" className="py-2 bg-body-secondary border-bottom">
            <Toolbar />
          </Col>
          <Col>
            <Row className="h-100">
              <Col className="p-0">
                {/* Intermediate div is present because we can't easily attach ref to Col */}
                <div className="h-100 w-100 position-relative" ref={ref}>
                  <div className="position-absolute">
                    <PathInputServiceProvider value={pathInputService}>
                      <CursorServiceProvider value={cursorService}>
                        <Pad dimensions={dimensions} />
                      </CursorServiceProvider>
                    </PathInputServiceProvider>
                  </div>
                </div>
              </Col>

              <Col
                xs="2"
                className="p-2 bg-body-tertiary border-start"
                data-cy="participants-drawer"
              >
                <Drawer />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
