import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import HomeActionStepHost from './HomeActionStepHost'
import HomeActionStepJoin from './HomeActionStepJoin'

export default function HomeActionStep({
  username,
  clearUsername,
}: {
  username: string
  clearUsername: () => void
}) {
  return (
    <Container data-cy="action-step">
      <div className="text-center mb-4">
        <h2 className="mb-0">
          Hello, <span data-cy="username">{username}</span>
        </h2>
        {/* TODO stylize like a link */}
        <div onClick={clearUsername} data-cy="clear-username">
          Not you? Change
        </div>
      </div>

      <Row>
        <Col>
          <HomeActionStepHost />
        </Col>

        <Col>
          <HomeActionStepJoin />
        </Col>
      </Row>
    </Container>
  )
}
