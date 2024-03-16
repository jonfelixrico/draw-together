import { Point } from './geometry.types'
import { PathData } from './pad.types'
import { SocketEventPayload } from './socket.types'

export enum PadSocketCode {
  PATH_DRAFT_START = 'PATH_DRAFT_START',
  PATH_DRAFT_MOVE = 'PATH_DRAFT_MOVE',
  PATH_CREATE = 'PATH_CREATE',
}

export type PadEventPayload<T> = SocketEventPayload<T>

export interface JoinedPayload {
  uuid: string
}

export interface UserDataPayload {
  uuid: string
  name: string
}

export interface PathDraftStartPayload extends PathData {
  counter: number
}

export interface PathDraftMovePayload {
  id: string
  counter: number
  point: Point
}

export type PathCreatePayload = PathData
