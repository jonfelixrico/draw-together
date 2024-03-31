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
    >
      We noticed that you are using a mobile device. Currently it is not
      supported by the web app. For the best experience, please use a laptop or
      a desktop.
    </BasicModal>
  )
}
