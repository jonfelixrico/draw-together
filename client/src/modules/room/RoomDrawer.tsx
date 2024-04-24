import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import manifest from '@manifest'
import ParticipantsList from '@/modules/participants/ParticipantsList'
import PadOptionsControls from '@/modules/pad/PadOptionsControls'
import Stack from 'react-bootstrap/Stack'
import PadTypeButton from '@/modules/room/PadTypeButton'

const VERSION = import.meta.env.VITE_VERSION_OVERRIDE || manifest.version

export default function RoomDrawer() {
  return (
    <Row className="h-100 w-100">
      <Col xs="auto">
        <Stack gap={1}>
          <PadTypeButton type="PATH">Path</PadTypeButton>

          <PadTypeButton type="RECTANGLE">Rect</PadTypeButton>
        </Stack>
      </Col>

      <Col className="flex-auto">
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
      </Col>
    </Row>
  )
}
