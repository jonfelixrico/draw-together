import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import BasicModal from '@/modules/common/BasicModal'

export default function RoomToolbarLeaveButton({
  onLeaveConfirm,
}: {
  onLeaveConfirm: () => void
}) {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button size="sm" variant="secondary" onClick={() => setShow(true)}>
        Leave
      </Button>
      <BasicModal
        title="Leave Room"
        ok={{
          label: 'Yes',
        }}
        cancel={{
          label: 'No',
        }}
        show={show}
        onHide={() => {
          setShow(false)
        }}
        onCancel={() => {
          setShow(false)
        }}
        onOk={() => {
          setShow(false)
          onLeaveConfirm()
        }}
      >
        Are you sure you want to leave the room?
      </BasicModal>
    </>
  )
}
