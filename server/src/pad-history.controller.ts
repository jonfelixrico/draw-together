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

export function padHistoryHandler (socket: Socket, roomId: string) {
  socket.on('PAD', (payload: unknown) => {
    saveEvent(roomId, payload)
  })


}
