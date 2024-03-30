import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import Button from 'react-bootstrap/Button'

export default function RoomLoaderErrorUnexpected() {
  return (
    <Card data-cy="error-unexpected">
      <Card.Body>
        <Stack gap={1}>
          <Card.Title className="text-center">Unexpected Error</Card.Title>
          <Card.Text className="text-center">Please try again later</Card.Text>

          <Button href="/" data-cy="return-btn">
            Return to the home page
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}
