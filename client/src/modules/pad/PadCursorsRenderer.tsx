import { Dimensions } from '@/modules/common/geometry.types'
import PadCursors from '@/modules/pad/PadCursors'
import { useAppSelector } from '@/store/hooks'
import mapValues from 'lodash/mapValues'
import { useMemo, useState } from 'react'
import { useInterval } from 'react-use'

function useCurrentTime(updateInterval: number) {
  const [now, setNow] = useState(Date.now())
  useInterval(() => {
    setNow(Date.now())
  }, updateInterval)

  return now
}

export default function PadCursorsRenderer({
  dimensions,
  scale,
  hideCursorThreshold,
}: {
  dimensions: Dimensions
  hideCursorThreshold?: number
  scale: number
}) {
  const participants = useAppSelector((root) => root.room.participants)
  const nameMap = useMemo(
    () => mapValues(participants, (value) => value.name),
    [participants]
  )

  const cursorMap = useAppSelector((root) => root.pad.cursors)

  const userDiameter = useAppSelector((root) => root.pad.options.thickness)

  const now = useCurrentTime(1000)

  return (
    <PadCursors
      cursorData={cursorMap}
      defaultDiameter={userDiameter}
      dimensions={dimensions}
      nameData={nameMap}
      scale={scale}
      hideCursorThreshold={hideCursorThreshold}
      nowTimestamp={now}
    />
  )
}
