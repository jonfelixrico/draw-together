import { Room } from '@/modules/room/room.types'
import Dexie, { Table } from 'dexie'

export interface RoomDbRecord extends Room {
  lastOpened: number
}

class LocalDb extends Dexie {
  rooms!: Table<RoomDbRecord>

  constructor() {
    super('db')
    this.version(1).stores({
      rooms: 'id',
    })
  }
}

export const localDb = new LocalDb()
