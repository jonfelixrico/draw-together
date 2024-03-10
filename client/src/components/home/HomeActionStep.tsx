import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'


export default function HomeActionStep () {
  return <Stack gap={1} direction='horizontal'>
    <Card>
      <Card.Body>
        <Button>Host Room</Button>
      </Card.Body>
    </Card>

    <Card>
      <Card.Body>
        <Stack gap={1}>
          <Form.Control placeholder='Room Code' />
          <Button>Join Room</Button>
        </Stack>
      </Card.Body>
    </Card>
  </Stack>
}