import { PadActions } from '@/modules/pad-common/pad.slice'
import { useAppDispatch } from '@/store/hooks'
import { ReactNode } from 'react'

export default function PadOptionsThicknessWheelInput({
  children,
}: {
  children: ReactNode
}) {
  const dispatch = useAppDispatch()

  function increment(value: number) {
    console.debug('Thickness incrementd by %d', value)
    dispatch(PadActions.incrementThickness(value))
  }

  const wheelHandler: React.WheelEventHandler<HTMLDivElement> = ({
    deltaY,
  }) => {
    // Mouse was scrolled down
    if (deltaY > 0) {
      increment(-1)
      return
    }

    // Mouse was scrolled up
    if (deltaY < 0) {
      increment(1)
      return
    }
  }

  return <div onWheelCapture={wheelHandler}>{children}</div>
}
