import Card from "react-bootstrap/Card"
import Button from 'react-bootstrap/Button'
import Stack from "react-bootstrap/Stack"

export default function RoomLoaderErrorNotFound () {
  return <Card>
    <Card.Body>
      <Stack gap={1}>
        <Card.Title className="text-center">
          Room not Found
        </Card.Title>
        <Button href="/">Return to the home page</Button>
      </Stack>
    </Card.Body>
  </Card>
}