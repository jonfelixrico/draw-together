import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ParticipantsList from './ParticipantsList'

export default function ParticipantsModalButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)} data-cy="participants-modal-button">
        Show Participants
      </Button>

      <Modal show={open} onHide={() => setOpen(false)} data-cy="participants-modal">
        <Modal.Header closeButton>
          <Modal.Title>Participants</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ParticipantsList />
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
