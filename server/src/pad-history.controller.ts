import { Socket } from "socket.io"

type RoomPadEvents = {
  [roomId: string]: unknown[]
}

// TODO move this to its own service
const roomPadEvents: RoomPadEvents = {}
function saveEvent(roomId: string, event: unknown) {
  if (!roomPadEvents[roomId]) {
    roomPadEvents[roomId] = []
  }

  roomPadEvents[roomId].push(event)
}

function getEvents(roomId: string, start: number, end: number): unknown[] {
  const events = roomPadEvents[roomId]
  if (!events) {
    return  []
  }

  return events.slice(start, end)
}

function getEventCount(roomId: string): number {
  return roomPadEvents[roomId]?.length ?? 0
}

type HistoryReq = Partial<{
  LENGTH: true
  FETCH: [number, number]
}>

type HistoryResp = Partial<{
  LENGTH: number
  FETCH: unknown[]
}>

export function padHistoryHandler (socket: Socket, roomId: string) {
  socket.on('PAD', (payload: unknown) => {
    saveEvent(roomId, payload)
  })

  socket.on('PAD_HISTORY', (
    request: HistoryReq,
    respond: (response: HistoryResp) => void
  ) => {
    if (request.FETCH) {
      const [start, end] = request.FETCH
      console.debug('Pad history for room %s was requested: %d to %d', roomId, start, end)
      return respond({
        FETCH: getEvents(roomId, start, end)
      })
    }

    if (request.LENGTH) {
      return respond({
        LENGTH: getEventCount(roomId)
      })
    }
  })
}
