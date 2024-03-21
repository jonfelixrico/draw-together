import { nanoid } from 'nanoid'
import { CronJob } from 'cron'
import { Room } from './room.class'

/*
 * TODO persist room data
 * For simplicity, we're just storing them in-memory for now
 */
const rooms: Record<string, Room> = {}

function createRoom() {
  const id = nanoid()
  const room = new Room(id)

  rooms[id] = room
  return room
}

function getRoom(id: string) {
  return rooms[id]
}

/*
 * This is for cleaning up inactive rooms
 *
 * Its performance will probably be bad if there are hundreds of rooms around.
 * Since the scale of the project is small, we'll choose simplicity over robustness.
 */
const job = new CronJob('* */1 * * * *', () => {
  const roomIds = Object.keys(rooms)
  const referenceTs = Date.now()

  for (const roomId of roomIds) {
    if (referenceTs - rooms[roomId].lastActivityTs < 5000) {
      return
    }

    delete rooms[roomId]
    console.debug('Room %s has been deleted due to inactivity', roomId)
  }
})
job.start()

export default {
  createRoom,
  getRoom,
}
