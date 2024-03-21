import { nanoid } from 'nanoid'
import { Room } from './room'

const rooms: Record<string, Room> = {}

function createRoom () {
  const id = nanoid()
  const room = new Room(id)

  rooms[id] = room
  return room
}

function getRoom(id: string) {
  return rooms[id]
}

export default {
  createRoom,
  getRoom
}
