export enum ServerSocketCode {
  CONN_LIST = 'CONN_LIST',
  CONN_ACTIVITY = 'CONN_ACTIVITY',
}

export const SERVER_SOCKET_EVENT = 'SERVER'

interface ConnectionActivityRespPayload {
  id: string
  name: string
  action: 'leave' | 'join'
}

interface ConnectionActivityResp {
  [ServerSocketCode.CONN_ACTIVITY]: ConnectionActivityRespPayload
}

interface ConnectedUser {
  id: string
  name: string
}

type ConnectedUsersListRespPayload = ConnectedUser[]
interface ConnectedUsersListResp {
  [ServerSocketCode.CONN_LIST]: ConnectedUsersListRespPayload
}

export type ServerResp = ConnectedUsersListResp | ConnectionActivityResp