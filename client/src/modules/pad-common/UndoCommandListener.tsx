import { useUndoStackService } from '@/modules/pad-common/undo-stack.context'
import { KeyboardEvent, ReactNode, useCallback } from 'react'

export default function UndoCommandListener({
  children,
}: {
  children: ReactNode
}) {
  const { undo, stack } = useUndoStackService()

  const handleUndo = useCallback(
    async ({ ctrlKey, key }: KeyboardEvent) => {
      if (ctrlKey && key.toLowerCase() === 'z' && stack.length) {
        console.debug('Executing undo...')
        await undo()
        console.log('Undo executed')
      }
    },
    [undo, stack]
  )

  return <div onKeyDown={handleUndo}>{children}</div>
}
