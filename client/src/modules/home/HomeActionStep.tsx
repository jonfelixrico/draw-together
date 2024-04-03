import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import HomeActionStepHost from './HomeActionStepHost'
import HomeActionStepJoin from './HomeActionStepJoin'
import HomeActionStepHistory from '@/modules/home/HomeActionStepHistory'

export default function HomeActionStep({
  username,
  clearUsername,
}: {
  username: string
  clearUsername: () => void
}) {
  return (
    <div data-cy="action-step">
      <div className="text-center mb-4">
        <h2 className="mb-0">
          Hello, <span data-cy="username">{username}</span>
        </h2>
        {/* TODO stylize like a link */}
        <span
          tabIndex={0}
          className="text-secondary"
          style={{ cursor: 'pointer' }}
          onClick={clearUsername}
          data-cy="clear-username"
        >
          Not you? Click here
        </span>
      </div>

      <Row className="gy-3">
        <Col sm="12" md>
          <HomeActionStepHost />
        </Col>

        <Col sm="12" md>
          <HomeActionStepJoin />
        </Col>

        <Col xs="12">
          <HomeActionStepHistory />
        </Col>
      </Row>
    </div>
  )
}
