import { PadActions } from '@/modules/pad-common/pad.slice'
import { useAppDispatch } from '@/store/hooks'
import { ReactNode } from 'react'

export default function PadOptionThicknessWheelInput({
  children,
}: {
  children: ReactNode
}) {
  const dispatch = useAppDispatch()

  const wheelHandler: React.WheelEventHandler<HTMLDivElement> = ({
    deltaY,
  }) => {
    if (deltaY > 0) {
      dispatch(PadActions.incrementThickness(1))
      return
    }

    if (deltaY < 0) {
      dispatch(PadActions.incrementThickness(-1))
      return
    }
  }

  return <div onWheelCapture={wheelHandler}>{children}</div>
}
