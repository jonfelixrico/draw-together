import { Dimensions } from '@/modules/common/geometry.types'
import PadCursor from '@/modules/pad/PadCursor'
import { useAppSelector } from '@/store/hooks'
import { sortBy } from 'lodash'
import { useMemo, useState } from 'react'
import { useInterval } from 'react-use'

function useCurrentTime(updateInterval = 1000) {
  const [now, setNow] = useState(Date.now())
  useInterval(() => {
    setNow(Date.now())
  }, updateInterval)

  return now
}

export default function PadCursorsRenderer({
  dimensions,
  hideCursorThreshold = 7_000,
}: {
  dimensions: Dimensions
  hideCursorThreshold?: number
}) {
  const now = useCurrentTime()

  const cursorMap = useAppSelector((root) => root.pad.cursors)
  const cursorList = useMemo(() => {
    // To display, the "age" of the cursor data must be no longer than the time set in the props
    const toDisplay = Object.values(cursorMap).filter(
      ({ timestamp }) => now - timestamp > hideCursorThreshold
    )

    // We're sorting by id to keep the ordering consistent between recomputes
    return sortBy(toDisplay, ({ id }) => id)
  }, [cursorMap, hideCursorThreshold, now])

  return (
    <div className="position-relative" style={dimensions}>
      {cursorList.map((cursor) => (
        <div className="position-absolute" key={cursor.id}>
          <PadCursor cursor={cursor} dimensions={dimensions} />
        </div>
      ))}
    </div>
  )
}
