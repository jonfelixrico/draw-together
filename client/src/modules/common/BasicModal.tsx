import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { ReactNode } from 'react'
import { If, Then } from 'react-if'

const EMPTY_FN = () => {}

export default function BasicModal({
  show,
  onHide = EMPTY_FN,
  children,
  cancel,
  ok,
  title,
  onCancel = EMPTY_FN,
  onOk = EMPTY_FN,
}: {
  show: boolean
  onHide?: () => void
  onOk?: () => void
  onCancel?: () => void
  children: ReactNode
  title: string
  cancel?: {
    label: string
    emitHide?: boolean
  }
  ok?: {
    label: string
    emitHide?: boolean
  }
}) {
  const handleCancel = () => {
    if (cancel?.emitHide) {
      onHide()
    }

    onCancel()
  }

  const handleOk = () => {
    if (ok?.emitHide) {
      onHide()
    }

    onOk()
  }

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
                <Button variant="secondary" onClick={handleCancel}>
                  {/* At this point, we expect cancel to be not null. The `?` operator is just here to not make TS complain. */}
                  {cancel?.label}
                </Button>
              </Then>
            </If>

            <If condition={!!ok}>
              <Then>
                <Button variant="primary" onClick={handleOk}>
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
