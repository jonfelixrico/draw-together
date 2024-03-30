import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@/modules/ui/loading.hook'

export default function HomeActionStepJoin() {
  const [roomId, setRoomId] = useState('')
  const navigate = useNavigate()
  const { setLoading } = useLoading()

  function joinRoom(roomId: string) {
    // We'll be letting the room page be the one to remove the loading overlay.
    setLoading(true)
    navigate(`/rooms/${roomId}`)
  }

  return (
    <Card className="h-100" data-cy="join-action">
      <Card.Body>
        <Card.Title as="h4" className="text-center">
          Join a Room
        </Card.Title>
        <Stack gap={1}>
          <Form.Control
            placeholder="Room Code"
            onChange={(event) => setRoomId(event.target.value)}
          />

          <Button disabled={!roomId} onClick={() => joinRoom(roomId)}>
            Join
          </Button>
        </Stack>
      </Card.Body>
    </Card>
  )
}
