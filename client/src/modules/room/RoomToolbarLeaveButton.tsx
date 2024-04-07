import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import BasicModal from '@/modules/common/BasicModal'

export function RoomToolbarLeaveButton() {
  const navigate = useNavigate()
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
          navigate('/')
        }}
      >
        Are you sure you want to leave the room?
      </BasicModal>
    </>
  )
}
