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

export default function RoomContent() {
  useParticipantWatcher()
  const [ref, dimensions] = useMeasure<HTMLDivElement>()
  usePathSocketWatcher()

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
        <Col xs="2" className="py-2">
          <div>Connected Users</div>
          <ParticipantsList />
        </Col>
        <Col>
          <Row className="flex-column h-100 gy-2">
            <Col>
              <div className="h-100 position-relative border p-0" ref={ref}>
                <div
                  className="position-absolute"
                  style={{ zIndex: 2 }}
                  data-cy="pad"
                >
                  <DrawServiceProvider>
                    <PadInput dimensions={dimensions} />
                  </DrawServiceProvider>
                </div>

                <PadContentRenderer dimensions={dimensions} />
              </div>
            </Col>
            <Col xs="auto">
              <PadPathControl />
            </Col>
            {/* Intermediate div is present because we can't easily attach ref to Col */}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}
