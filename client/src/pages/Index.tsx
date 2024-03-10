import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'

export function Component () {
  return <Container className="vh-100">
    <Row className='flex-column g-2 h-100 justify-content-center'>
      <Form.Control placeholder="Your Name" />

      <InputGroup className='px-0'>
        <Form.Control placeholder="Room Code" />
        <Button>Join a drawing room</Button>
      </InputGroup>

      <Button>Host a drawing room</Button>
    </Row>
  </Container>
}