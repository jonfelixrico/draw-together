import { Socket } from 'socket.io'
import roomService from '@/services/room.service'

function saveEvent(roomId: string, event: unknown) {
  const room = roomService.getRoom(roomId)
  room.addToHistory(event)
}

export function padHistoryHandler(socket: Socket, roomId: string) {
  socket.on('PAD', (payload: unknown) => {
    saveEvent(roomId, payload)
  })
}
