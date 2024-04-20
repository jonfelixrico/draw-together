import { Point } from '@/modules/common/geometry.types'
import { PathData } from '@/modules/pad-common/pad.types'

export const PAD_SOCKET_EVENT = 'PAD'

export enum PadSocketCode {
  PATH_DRAFT_START = 'PATH_DRAFT_START',
  PATH_DRAFT_MOVE = 'PATH_DRAFT_MOVE',
  PATH_CREATE = 'PATH_CREATE',
  PATH_DELETE = 'PATH_DELETE',
}

export interface PathDraftStartPayload extends PathData {
  counter: number
}
interface PathDraftStart {
  [PadSocketCode.PATH_DRAFT_START]: PathDraftStartPayload
}

export interface PathDraftMovePayload {
  id: string
  counter: number
  point: Point
}
interface PathDraftMove {
  [PadSocketCode.PATH_DRAFT_MOVE]: PathDraftMovePayload
}

export type PathCreatePayload = PathData
interface PathCreate {
  [PadSocketCode.PATH_CREATE]: PathCreatePayload
}

export interface PathDeletePayload {
  id: string
}
interface PathDelete {
  [PadSocketCode.PATH_DELETE]: PathDeletePayload
}

export type PadResponse = Partial<
  PathDraftStart & PathDraftMove & PathCreate & PathDelete
>
export type PadRequest = Partial<PadResponse & PathDelete>
