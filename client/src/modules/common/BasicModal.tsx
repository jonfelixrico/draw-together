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
  onCancel,
  onOk,
}: {
  show: boolean
  onHide?: () => void
  onOk?: () => void
  onCancel?: () => void
  children: ReactNode
  title: string
  cancel?: {
    label: string
  }
  ok?: {
    label: string
  }
}) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>{children}</Modal.Body>

      <If condition={!!cancel || !!ok}>
        <Then>
          <Modal.Footer>
            <If condition={!!cancel}>
              <Then>
                <Button variant="secondary" onClick={onCancel}>
                  {/* At this point, we expect cancel to be not null. The `?` operator is just here to not make TS complain. */}
                  {cancel?.label}
                </Button>
              </Then>
            </If>

            <If condition={!!ok}>
              <Then>
                <Button variant="primary" onClick={onOk}>
                  {ok?.label}
                </Button>
              </Then>
            </If>
          </Modal.Footer>
        </Then>
      </If>
    </Modal>
  )
}
