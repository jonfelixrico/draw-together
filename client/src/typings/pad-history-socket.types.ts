export type PadHistoryRequest = Partial<{
  LENGTH: true
  FETCH: [number, number]
}>

export type PadHistoryResponse = Partial<{
  LENGTH: number
  FETCH: unknown[]
}>
