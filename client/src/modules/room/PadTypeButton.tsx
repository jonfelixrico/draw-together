import { PadElementType } from '@/modules/pad-common/pad.types'
import usePadActiveType from '@/modules/room/pad-active-type.hook'
import Button, { ButtonProps } from 'react-bootstrap/Button'

export default function PadTypeButton({
  type,
  children,
  ...others
}: Omit<ButtonProps, 'type'> & {
  type: PadElementType
}) {
  const { activeType, setActiveType } = usePadActiveType()
  const isActive = type === activeType

  return (
    <Button
      {...others}
      onClick={() => setActiveType(type)}
      variant={isActive ? 'primary' : 'outline-primary'}
      data-cy="type-button"
      data-type={type}
      data-active={isActive}
    >
      {children}
    </Button>
  )
}
