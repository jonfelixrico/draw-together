import { Dimensions } from '@/modules/common/geometry.types'
import PadCursors from '@/modules/pad/PadCursors'
import { useAppSelector } from '@/store/hooks'
import mapValues from 'lodash/mapValues'
import { useMemo } from 'react'

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

  return (
    <PadCursors
      cursorData={cursorMap}
      defaultDiameter={userDiameter}
      dimensions={dimensions}
      nameData={nameMap}
      scale={scale}
      hideCursorThreshold={hideCursorThreshold}
    />
  )
}
