import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useParticipantWatcher } from '@/modules/participants/participants.hook'
import { useMeasure } from 'react-use'
import PadContentRenderer from '@/components/pad/PadContentRenderer'
import { PadInput } from '@/components/pad/PadInput'
import DrawServiceProvider from './service/DrawServiceProvider'
import { usePathSocketWatcher } from './service/socket-path-watcher.hook'
import PadPathControl from '@/components/pad/PadPathControl'
import ParticipantsList from '@/modules/participants/ParticipantsList'
import { useScreen } from '@/modules/common/screen.hook'
import { If, Then } from 'react-if'
import ParticipantsModalButton from '@/modules/participants/ParticipantsModalButton'

export default function RoomContent() {
  useParticipantWatcher()
  const [ref, dimensions] = useMeasure<HTMLDivElement>()
  usePathSocketWatcher()

  const screen = useScreen()

  return (
    <Container
      data-cy="room-page"
      className="vh-100"
      style={{
        // touch-action: none is required to make drawing work for touchscreen devices
        touchAction: 'none',
      }}
    >
      <Row className="h-100">
        <If condition={screen.gt.md}>
          <Then>
            <Col xs="2" className="py-2" data-cy="participants-drawer">
              <div>Connected Users</div>
              <ParticipantsList />
            </Col>
          </Then>
        </If>
        <Col>
          <Row className="flex-column h-100 gy-2">
            <Col className="pt-2">
              {/* Intermediate div is present because we can't easily attach ref to Col */}
              <div
                className="h-100 w-100 position-relative border"
                ref={ref}
                style={dimensions}
              >
                <div
                  className="position-absolute"
                  style={{ zIndex: 2 }}
                  data-cy="pad"
                >
                  <DrawServiceProvider>
                    <PadInput dimensions={dimensions} />
                  </DrawServiceProvider>
                </div>

                <div className="position-absolute" style={{ zIndex: 1 }}>
                  <PadContentRenderer dimensions={dimensions} />
                </div>
              </div>
            </Col>
            <Col xs="auto">
              <Row>
                <If condition={screen.lt.lg}>
                  <Then>
                    <Col xs="auto">
                      <ParticipantsModalButton />
                    </Col>
                  </Then>
                </If>

                <Col>
                  <PadPathControl />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
