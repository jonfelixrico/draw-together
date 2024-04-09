import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParticipantWatcher } from '@/modules/participants/participants.hook'
import { useMeasure } from 'react-use'
import { usePathSocketWatcher } from '@/modules/pad-socket/socket-path-watcher.hook'
import ParticipantsList from '@/modules/participants/ParticipantsList'
import { PathInputServiceProvider } from '@/modules/pad-service/path-input-service.context'
import { usePathInputServiceImpl } from '@/modules/pad-service/path-input-service-impl.hook'
import { Pad } from '@/modules/pad/Pad'
import { CursorServiceProvider } from '@/modules/pad-service/cursor-service.context'
import { useCursorServiceImpl } from '@/modules/pad-service/cursor-service-impl.hook'
import PadOptionsControls from '@/modules/pad/PadOptionsControls'
import MobileScreenWarningModal from '@/pages/Room/MobileScreenWarningModal'
import { RoomToolbar } from '@/modules/room/RoomToolbar'
import manifest from '@manifest'
import { useEffect } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { RoomActions } from '@/modules/room/room.slice'

const VERSION = import.meta.env.VITE_VERSION_OVERRIDE || manifest.version

function Drawer() {
  return (
    <Row className="h-100 w-100 flex-column gy-3 m-0">
      <Col xs="auto">
        <div className="h6">Participants</div>
        <ParticipantsList />
      </Col>

      <div>
        <div className="border-bottom" />
      </div>

      <Col>
        <div className="h6">Options</div>
        <PadOptionsControls />
      </Col>

      <Col xs="auto" className="text-end">
        v{VERSION}
      </Col>
    </Row>
  )
}

export default function RoomContent() {
  useParticipantWatcher()
  usePathSocketWatcher()

  const pathInputService = usePathInputServiceImpl()
  const cursorService = useCursorServiceImpl()

  const dispatch = useAppDispatch()

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  useEffect(() => {
    dispatch(RoomActions.setViewportDimensions({ width, height }))
  }, [width, height, dispatch])

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
            <RoomToolbar />
          </Col>
          <Col>
            <Row className="h-100">
              <Col className="p-0">
                {/* Intermediate div is present because we can't easily attach ref to Col */}
                <div
                  className="h-100 w-100 position-relative d-flex flex-column justify-content-center align-items-center"
                  ref={ref}
                >
                  <div className="position-absolute">
                    <PathInputServiceProvider value={pathInputService}>
                      <CursorServiceProvider value={cursorService}>
                        <Pad />
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
