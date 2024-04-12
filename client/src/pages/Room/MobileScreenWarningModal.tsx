import { useScreen } from '@/modules/common/screen.hook'
import { useState } from 'react'
import { useMount } from '@/modules/common/lifecycle.hook'
import BasicModal from '@/modules/common/BasicModal'

export default function MobileScreenWarningModal() {
  const [show, setShow] = useState(false)
  const screen = useScreen()

  useMount(() => {
    if (screen.lt.md) {
      console.log('Mobile device detected. Showing the warning.')
      setShow(true)
    }
  })

  function handleClose() {
    setShow(false)
  }

  return (
    <BasicModal
      title="Mobile Detected"
      ok={{
        label: 'I understand',
      }}
      show={show}
      onHide={handleClose}
      onOk={handleClose}
      data-cy="mobile-warning-modal"
    >
      We noticed that you are using a mobile device. We don't fully support
      mobile devices as of now. For a better experience, please use a desktop or
      a laptop.
    </BasicModal>
  )
}
