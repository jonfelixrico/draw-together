import { Point } from "./geometry.types"
import { PathRenderData } from "./pad.types"

export enum RoomSocketCode {
  JOINED = 'JOINED',
  USER_DATA = 'USER_DATA',
  CONN_LIST = 'CONN_LIST',
  CONN_ACTIVITY = 'CONN_ACTIVITY',

  PATH_CREATING = 'PATH_CREATING',
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

export interface PathCreatingStartPayload extends PathRenderData {
  id: string
  counter: number // TODO set to 9
  timestamp: number
}

export interface PathCreatingPayload {
  id: string
  counter: number
  point: Point
}

export type PathCreatedPayload = PathRenderData & {
  id: string
  timestamp: number
}
