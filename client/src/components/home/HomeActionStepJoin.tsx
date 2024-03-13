import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HomeActionStepJoin () {
  const [roomId, setRoomId] = useState('')
  const navigate = useNavigate()

  return <Card className="h-100">
    <Card.Body>
      <Card.Title as="h4" className='text-center'>
        Join a Room
      </Card.Title>
      <Stack gap={1}>
        <Form.Control
          placeholder='Room Code'
          onChange={(event) => setRoomId(event.target.value)}
        />

        <Button disabled={!roomId} onClick={() => navigate(`/rooms/${roomId}`)}>Join</Button>
      </Stack>
    </Card.Body>
  </Card>
}