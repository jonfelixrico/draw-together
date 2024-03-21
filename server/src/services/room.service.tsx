import { nanoid } from 'nanoid'
import { CronJob } from 'cron'
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

const job = new CronJob('* */5 * * * *', () => {
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
  getRoom
}
