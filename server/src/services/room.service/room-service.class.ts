import { nanoid } from 'nanoid'
import { CronJob } from 'cron'
import { Room } from './room.class'

export class RoomService {
  /*
   * TODO persist room data
   * For simplicity, we're just storing them in-memory for now
   */
  private rooms: Record<string, Room> = {}
  private cronJob: CronJob

  constructor() {
    /*
     * This is for cleaning up inactive rooms
     *
     * Its performance will probably be bad if there are hundreds of rooms around.
     * Since the scale of the project is small, we'll choose simplicity over robustness.
     */
    this.cronJob = new CronJob('* */1 * * * *', () => this.purgeInactiveRooms())
  }

  private purgeInactiveRooms() {
    const roomIds = Object.keys(this.rooms)
    const referenceTs = Date.now()

    for (const roomId of roomIds) {
      if (referenceTs - this.rooms[roomId].lastActivityTs < 1000 * 60 * 30) {
        return
      }

      delete this.rooms[roomId]
      console.debug('Room %s has been deleted due to inactivity', roomId)
    }
  }

  createRoom() {
    const id = nanoid()
    const room = new Room(id)

    this.rooms[id] = room
    return room
  }

  getRoom(id: string) {
    return this.rooms[id]
  }

  start() {
    this.cronJob.start()
  }
}
