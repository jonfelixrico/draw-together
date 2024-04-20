import { useUndoStackService } from '@/modules/pad-common/undo-stack.context'
import { useCallback, useEffect } from 'react'

export default function useUndoCommandListener() {
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

  useEffect(() => {
    const fnRef = handleUndo
    window.addEventListener('keydown', fnRef)

    return () => {
      window.removeEventListener('keydown', fnRef)
    }
  }, [handleUndo])
}
