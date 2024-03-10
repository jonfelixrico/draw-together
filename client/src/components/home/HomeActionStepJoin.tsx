import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'

export default function HomeActionStepJoin () {
  return <Card className="h-100">
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
}