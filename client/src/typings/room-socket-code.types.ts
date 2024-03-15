import { Point } from "./geometry.types"
import { PathData } from "./pad.types"

export enum RoomSocketCode {
  JOINED = 'JOINED',
  USER_DATA = 'USER_DATA',
  CONN_LIST = 'CONN_LIST',
  CONN_ACTIVITY = 'CONN_ACTIVITY',

  PATH_DRAFT = 'PATH_DRAFT',
  PATH_CREATED = 'PATH_CREATED'
}

export enum RoomSocketEvent {
  BROADCAST = 'BROADCAST',
  SERVER_REQ = 'SERVER_REQ'
}

export interface BroadcastPayload<T = unknown> {
  code: RoomSocketCode
  payload: T
}

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

export type PathCreatedPayload = PathData
