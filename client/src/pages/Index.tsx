import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

export function Component () {
  return <Container className="vh-100 d-flex flex-column justify-content-center">
    <div>
      <Stack gap={2}>
        <Form.Control placeholder="Your Name" />

        <InputGroup className='px-0'>
          <Form.Control placeholder="Room Code" />
          <Button>Join a drawing room</Button>
        </InputGroup>

        <Button>Host a drawing room</Button>
      </Stack>
    </div>
  </Container>
}