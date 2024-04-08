import Card from 'react-bootstrap/Card'
import { Else, If, Then } from 'react-if'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { ReactNode, useState } from 'react'
import BasicModal from '@/modules/common/BasicModal'

export default function HistoryLayout({
  onClearConfirm,
  noEntries,
  children,
}: {
  onClearConfirm: () => void
  noEntries?: boolean
  children?: ReactNode
}) {
  const [show, setShow] = useState(false)

  return (
    <>
      <BasicModal
        title="Clear History"
        show={show}
        onHide={() => setShow(false)}
        onOk={() => {
          setShow(false)
          onClearConfirm()
        }}
        ok={{
          label: 'Yes, clear history',
          variant: 'danger',
        }}
        cancel={{
          label: 'No, cancel',
          emitHide: true,
        }}
        data-cy="clear-confirm-modal"
      >
        Are you sure you want to clear your history?
      </BasicModal>

      <Card>
        <Card.Body>
          <Row className="justify-content-between align-items-center mb-3">
            <Col xs="auto">
              <Card.Title>Join History</Card.Title>
            </Col>

            <Col xs="auto">
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShow(true)}
                disabled={noEntries}
                data-cy="clear"
              >
                Clear History
              </Button>
            </Col>
          </Row>

          <If condition={!noEntries}>
            <Then>{children}</Then>

            <Else>
              <div data-cy="empty-notice">No items to show</div>
            </Else>
          </If>
        </Card.Body>
      </Card>
    </>
  )
}
