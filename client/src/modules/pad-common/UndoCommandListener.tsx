import { useUndoStackService } from '@/modules/pad-common/undo-stack.context'
import { ReactNode, useEffect } from 'react'

export default function UndoCommandListener({
  children,
}: {
  children: ReactNode
}) {
  const { undo } = useUndoStackService()

  useEffect(() => {
    const undoWrapper = async (ev: KeyboardEvent) => {
      if (ev.ctrlKey && ev.key.toLowerCase() === 'z') {
        console.debug('Executing undo...')
        await undo()
        console.log('Undo executed')
      }
    }

    document.addEventListener('keydown', undoWrapper)

    return () => {
      document.removeEventListener('keydown', undoWrapper)
    }
  }, [undo])

  return <>{children}</>
}
