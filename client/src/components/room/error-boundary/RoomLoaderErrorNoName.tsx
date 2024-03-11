import Card from "react-bootstrap/Card"
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { useLocalStorage } from "react-use"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function RoomLoaderErrorNoName (props: {
  roomId: string
}) {
  const [username, setUsername] = useState('')
  const [_, setLsUsername] = useLocalStorage('username', '')
  const navigate = useNavigate()

  function setUsernameAndNavigate () {
    setLsUsername(username)
    navigate(`/rooms/${props.roomId}`)
  }

  return <Card>
    <Card.Body>
      <Stack gap={1}>
        <Card.Title className="text-center">Enter a name</Card.Title>
        <Card.Text className="text-center">Please enter a name before entering the room</Card.Text>

        <Form.Control
          placeholder="Enter a name"
          onChange={e => setUsername(e.target.value)} />

        <Button
          disabled={!username}
          onClick={setUsernameAndNavigate}
        >
          Confirm Name
        </Button>
      </Stack>
    </Card.Body>
  </Card>
}