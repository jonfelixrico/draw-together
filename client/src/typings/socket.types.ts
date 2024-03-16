export enum SocketEventType {
  PAD = 'PAD',
  SERVER = 'SERVER',
}

export interface SocketEventPayload<Payload> {
  code: string
  payload: Payload
}
