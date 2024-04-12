import BasicModal from '@/modules/common/BasicModal'
import { DataAttributes } from '@/modules/common/react.types'
import { ReactNode, useState } from 'react'
import Button from 'react-bootstrap/Button'

export default function BasicButtonTriggeredModal({
  children,
  modalProps,
  buttonProps,
  buttonAttrs = {},
  modalAttrs = {},
}: {
  modalProps: {
    title: string
  }

  children: ReactNode

  buttonProps: {
    label: string
    variant?: string
  }

  buttonAttrs?: DataAttributes
  modalAttrs?: DataAttributes
}) {
  const [show, setShow] = useState(false)
  return (
    <>
      <Button
        variant={buttonProps.variant}
        onClick={() => setShow(true)}
        {...buttonAttrs}
      >
        {buttonProps.label}
      </Button>

      <BasicModal
        show={show}
        onHide={() => setShow(false)}
        title={modalProps.title}
        {...modalAttrs}
      >
        {children}
      </BasicModal>
    </>
  )
}
