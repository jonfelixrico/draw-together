import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'

export default function RoomLoaderErrorNotFound() {
  return (
    <Card data-cy="error-not-found">
      <Card.Body>
        <Stack gap={1}>
          <Card.Title className="text-center">Room not Found</Card.Title>
          <Button href="/" data-cy="return-btn">
            Return to the home page
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}
