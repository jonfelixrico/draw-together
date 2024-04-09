import BasicModal from '@/modules/common/BasicModal'
import RoomDrawer from '@/modules/room/RoomDrawer'
import { useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function RoomDrawerModalButton() {
  const [show, setShow] = useState(false)

  return (
    <>
      {/* TODO adjust label */}
      <Button onClick={() => setShow(true)}>Show Options</Button>

      <BasicModal show={show} onHide={() => setShow(false)} title="Options">
        <RoomDrawer />
      </BasicModal>
    </>
  )
}
