import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

export default function HomeUsernameStep(props: {
  onInput: (value: string) => void
}) {
  const [value, setValue] = useState('')

  return (
    <Row className="justify-content-center">
      <Col xs md="10" lg="6">
        <Card data-cy="username-step">
          <Card.Body>
            <Stack gap={1}>
              <Form.Control
                placeholder="Pick a name"
                name="name"
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />

              <Button
                type="submit"
                disabled={!value}
                onClick={() => props.onInput(value)}
              >
                Confirm Name
              </Button>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
