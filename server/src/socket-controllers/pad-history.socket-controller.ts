import { Socket } from 'socket.io'
import roomService from '@/services/room.service'

function saveEvent(roomId: string, event: unknown) {
  const room = roomService.getRoom(roomId)
  room.addToHistory(event)
}

function getEvents(roomId: string, start: number, end: number): unknown[] {
  const room = roomService.getRoom(roomId)
  return room.history.slice(start, end)
}

function getEventCount(roomId: string): number {
  const room = roomService.getRoom(roomId)
  return room.history.length
}

// TODO use a common package for this project's types
type HistoryReq = Partial<{
  LENGTH: true
  FETCH: [number, number]
}>

type HistoryResp = Partial<{
  LENGTH: number
  FETCH: unknown[]
}>

export function padHistoryHandler(socket: Socket, roomId: string) {
  socket.on('PAD', (payload: unknown) => {
    saveEvent(roomId, payload)
  })

  socket.on(
    'PAD_HISTORY',
    (request: HistoryReq, respond: (response: HistoryResp) => void) => {
      if (request.FETCH) {
        const [start, end] = request.FETCH
        console.debug(
          'Pad history for room %s was requested: %d to %d',
          roomId,
          start,
          end
        )
        return respond({
          FETCH: getEvents(roomId, start, end),
        })
      }

      if (request.LENGTH) {
        return respond({
          LENGTH: getEventCount(roomId),
        })
      }
    }
  )
}
