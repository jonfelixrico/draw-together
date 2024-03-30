import { Point } from '../../typings/geometry.types'
import { PathData } from '../../typings/pad.types'

export const PAD_SOCKET_EVENT = 'PAD'

export enum PadSocketCode {
  PATH_DRAFT_START = 'PATH_DRAFT_START',
  PATH_DRAFT_MOVE = 'PATH_DRAFT_MOVE',
  PATH_CREATE = 'PATH_CREATE',
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

export type PadResponse = Partial<PathDraftStart & PathDraftMove & PathCreate>
export type PadRequest = PadResponse
