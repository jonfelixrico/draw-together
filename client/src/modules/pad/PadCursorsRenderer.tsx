import { Dimensions } from '@/modules/common/geometry.types'
import PadCursor from '@/modules/pad/PadCursor'
import { useAppSelector } from '@/store/hooks'
import mapValues from 'lodash/mapValues'
import sortBy from 'lodash/sortBy'
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

  const participants = useAppSelector((root) => root.room.participants)
  const nameMap = useMemo(
    () => mapValues(participants, (value) => value.name),
    [participants]
  )

  const cursorMap = useAppSelector((root) => root.pad.cursors)
  const cursorList = useMemo(() => {
    /*
     * To display, the "age" of the cursor data must be no longer than the time set in the props
     * No timestamp means that the cursor is immortal
     */
    const toDisplay = Object.values(cursorMap).filter(
      ({ timestamp }) => !timestamp || now - timestamp < hideCursorThreshold
    )

    // We're sorting by id to keep the ordering consistent between recomputes
    return sortBy(toDisplay, ({ id }) => id)
  }, [cursorMap, hideCursorThreshold, now])

  const userDiameter = useAppSelector((root) => root.pad.options.thickness)

  return (
    <div className="position-relative" style={dimensions}>
      {cursorList.map(({ id, point, diameter }) => {
        const safeDiameter = diameter ?? userDiameter
        return (
          <div className="position-absolute" key={id}>
            <PadCursor
              point={point}
              label={nameMap[id] ?? 'Unknown'}
              dimensions={dimensions}
              diameter={safeDiameter}
            />
          </div>
        )
      })}
    </div>
  )
}
