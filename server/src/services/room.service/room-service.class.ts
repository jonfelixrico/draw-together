import { nanoid } from 'nanoid'
import { CronJob } from 'cron'
import { Room } from './room.class'

/**
 * In millis.
 */
export const INACTIVITY_THRESHOLD = 1000 * 60 * 30

export class RoomService {
  /**
   * TODO persist room data
   * For simplicity, we're just storing them in-memory for now
   * 
   * This is public to be mockable by jest. This should NOT be accessed
   * outside of tests.
   * @private
   */
  public rooms: Record<string, Room> = {}
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

  /**
   * Exposed as public for jest. Do NOT call in app code.
   * @private 
   */
  purgeInactiveRooms() {
    const roomIds = Object.keys(this.rooms)
    const referenceTs = Date.now()

    for (const roomId of roomIds) {
      if (referenceTs - this.rooms[roomId].lastActivityTs < INACTIVITY_THRESHOLD) {
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
