import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParticipantWatcher } from '@/modules/participants/participants.hook'
import { useMeasure } from 'react-use'
import { usePathSocketWatcher } from '@/modules/pad-socket/socket-path-watcher.hook'
import { PathInputServiceProvider } from '@/modules/pad-service/path-input-service.context'
import { usePathInputServiceImpl } from '@/modules/pad-service/path-input-service-impl.hook'
import { Pad } from '@/modules/pad/Pad'
import { CursorServiceProvider } from '@/modules/pad-service/cursor-service.context'
import { useCursorServiceImpl } from '@/modules/pad-service/cursor-service-impl.hook'
import MobileScreenWarningModal from '@/pages/Room/MobileScreenWarningModal'
import { RoomToolbar } from '@/modules/room/RoomToolbar'
import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { If, Then } from 'react-if'
import { useScreen } from '@/modules/common/screen.hook'
import RoomDrawer from '@/modules/room/RoomDrawer'
import BasicButtonTriggeredModal from '@/modules/common/BasicButtonTriggeredModal'
import useUndoCommandListener from '@/modules/pad-common/undo-command-listener.hook'
import { ShapeInputServiceProvider } from '@/modules/pad-service/shape-input-service.context'
import { useShapeInputServiceImpl } from '@/modules/pad-service/shape-input-service-impl.context'
import { useShapeSocketWatcher } from '@/modules/pad-socket/shape-watcher.hook'

export default function RoomContent() {
  useParticipantWatcher()
  usePathSocketWatcher()
  useUndoCommandListener()
  useShapeSocketWatcher()

  const pathInputService = usePathInputServiceImpl()
  const cursorService = useCursorServiceImpl()
  const shapeService = useShapeInputServiceImpl()

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
            <RoomToolbar>
              <If condition={screen.lt.md}>
                <Then>
                  <BasicButtonTriggeredModal
                    buttonProps={{
                      label: 'Show Options',
                      size: 'sm',
                      variant: 'secondary',
                    }}
                    modalProps={{
                      title: 'Options',
                    }}
                    buttonAttrs={{
                      'data-cy': 'options-modal-button',
                    }}
                  >
                    <RoomDrawer />
                  </BasicButtonTriggeredModal>
                </Then>
              </If>
            </RoomToolbar>
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
                        <ShapeInputServiceProvider value={shapeService}>
                          <Pad scale={scale} dimensions={padDims} />
                        </ShapeInputServiceProvider>
                      </CursorServiceProvider>
                    </PathInputServiceProvider>
                  </div>
                </div>
              </Col>

              <If condition={screen.gt.sm}>
                <Then>
                  <Col
                    md="5"
                    lg="4"
                    xl="3"
                    className="p-2 bg-body-tertiary border-start"
                    data-cy="options-drawer"
                  >
                    <RoomDrawer />
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
