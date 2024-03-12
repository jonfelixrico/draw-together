export enum RoomSocketCode {
  JOINED,
  USER_DATA
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