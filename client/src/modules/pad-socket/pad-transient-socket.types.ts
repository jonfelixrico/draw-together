import { Point } from '@/modules/common/geometry.types'

export const PAD_TRANSIENT_EVENT_TYPE = 'PAD_TRANSIENT'

export enum PadTransientSocketCode {
  CURSOR_UPDATE = 'CURSOR_UPDATE',
}

export interface CursorUpdatePayload {
  point: Point
  id: string
  diameter: number
}
