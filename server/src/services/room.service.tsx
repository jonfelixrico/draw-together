import { nanoid } from 'nanoid'

type AbstractPadEvent = Record<string, unknown>

export class Room {
  private history: AbstractPadEvent[]
  public lastActivityTs: number

  constructor(public readonly roomId: string) {
    this.lastActivityTs = Date.now()
  }

  bumpLastActivityTs () {
    this.lastActivityTs = Date.now()
  }

  addToHistory (event: AbstractPadEvent) {
    this.bumpLastActivityTs()
    this.history.push(event)
  }
}

const rooms: Record<string, Room> = {}

export function createRoom () {
  const id = nanoid()
  const room = new Room(id)

  rooms[id] = room
  return room
}

export function getRoom(id: string) {
  return rooms[id]
}
