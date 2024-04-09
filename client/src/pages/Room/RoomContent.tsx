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
import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { If, Then } from 'react-if'
import { useScreen } from '@/modules/common/screen.hook'

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

  const [ref, { width, height }] = useMeasure<HTMLDivElement>()
  const padDims = useAppSelector((state) => state.room.padDimensions)

  const scale = useMemo(() => {
    const scaleViaWidth = width / padDims.width
    const scaleViaHeight = height / padDims.height

    return Math.min(scaleViaWidth, scaleViaHeight)
  }, [width, height, padDims])

  const screen = useScreen()

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
          <Col xs="auto" className="py-2 bg-body border-bottom">
            <RoomToolbar />
          </Col>
          <Col>
            <Row className="h-100">
              <Col className="p-0">
                {/* Intermediate div is present because we can't easily attach ref to Col */}
                <div
                  className="h-100 w-100 bg-body-secondary position-relative d-flex flex-column justify-content-center align-items-center"
                  ref={ref}
                >
                  <div className="position-absolute bg-white">
                    <PathInputServiceProvider value={pathInputService}>
                      <CursorServiceProvider value={cursorService}>
                        <Pad scale={scale} dimensions={padDims} />
                      </CursorServiceProvider>
                    </PathInputServiceProvider>
                  </div>
                </div>
              </Col>

              <If condition={screen.gt.sm}>
                <Then>
                  <Col
                    md="4"
                    lg="3"
                    xl="2"
                    className="p-2 bg-body-tertiary border-start"
                    data-cy="participants-drawer"
                  >
                    <Drawer />
                  </Col>
                </Then>
              </If>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  )
}
