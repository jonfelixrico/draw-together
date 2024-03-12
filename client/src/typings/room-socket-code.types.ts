export enum RoomSocketCode {
  JOINED,
  USER_DATA
}

export interface JoinedPayload {
  uuid: string
}
