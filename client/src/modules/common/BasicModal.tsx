import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { ReactNode } from 'react'
import { If, Then } from 'react-if'

export default function BasicModal({
  show,
  onHide,
  children,
  cancel,
  ok,
  title,
}: {
  show: boolean
  onHide: () => void
  children: ReactNode
  title: string
  cancel?: {
    label: string
  }
  ok: {
    label: string
  }
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <Modal.Footer>
        <If condition={!!cancel}>
          <Then>
            <Button variant="secondary" onClick={onHide}>
              {cancel?.label}
            </Button>
          </Then>
        </If>

        <Button variant="primary" onClick={onHide}>
          {ok.label}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
