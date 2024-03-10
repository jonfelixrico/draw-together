import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

export default function HomeActionStep ({
  username,
  clearUsername
}: {
  username: string
  clearUsername: () => void
}) {
  return <Container>
    <div className='text-center mb-4'>
      <h2 className='mb-0'>Hello, {username}</h2>
      {/* TODO stylize like a link */}
      <div onClick={() => clearUsername()}>Not you? Change</div>
    </div>

    <Row>
      <Col>
        <Card className="h-100">
          <Card.Body className='d-flex flex-column justify-content-between'>
            <Card.Title className='text-center' as="h4">Host a Room</Card.Title>
            <Button className='w-100'>Host Room</Button>
          </Card.Body>
        </Card>
      </Col>

      <Col>
        <Card className="h-100">
          <Card.Body>
            <Card.Title as="h4" className='text-center'>
              Join a Room
            </Card.Title>
            <Stack gap={1}>
              <Form.Control placeholder='Room Code' />
              <Button>Join</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
}