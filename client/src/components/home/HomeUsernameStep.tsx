import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'

export default function HomeUsernameStep () {
  return <Card>
    <Card.Body>
      <Stack gap={1}>
        <Form.Control placeholder='Pick a name' />
        <Button>Confirm and Submit</Button>
      </Stack>
    </Card.Body>
  </Card>
}