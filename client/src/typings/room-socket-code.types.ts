export enum RoomSocketCode {
  JOINED = 'JOINED',
  USER_DATA = 'USER_DATA',
  CONN_LIST = 'CONN_LIST',
  CONN_ACTIVITY = 'CONN_ACTIVITY'
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