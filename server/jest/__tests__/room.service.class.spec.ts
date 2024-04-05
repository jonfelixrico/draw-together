// TODO support absolute paths. these are a mess.
import {
  INACTIVITY_THRESHOLD,
  RoomService,
} from '@/services/room.service/room-service.class'
import { Room } from '@/services/room.service/room.class'

describe('room-service', () => {
  it('purges rooms past the inactivity threshold', () => {
    const room = new Room('room_id')
    // Forces lastActivityTs to be way past the inactivity threshold
    jest
      .spyOn(room, 'lastActivityTs', 'get')
      .mockReturnValue(Date.now() - INACTIVITY_THRESHOLD * 2)

    const service = new RoomService()
    service.rooms['room_id'] = room
    service.rooms['dummy1'] = new Room('dummy1')
    service.rooms['dummy2'] = new Room('dummy2')
    service.rooms['dummy3'] = new Room('dummy3')

    expect(service.rooms).toEqual(
      expect.objectContaining({
        room_id: expect.any(Room),
      })
    )
    expect(Object.values(service.rooms)).toHaveLength(4)

    service.purgeInactiveRooms()

    expect(service.rooms).toEqual(
      expect.not.objectContaining({
        room_id: expect.any(Room),
      })
    )
    expect(Object.values(service.rooms)).toHaveLength(3)
  })

  it('does NOT purge rooms not crossing the inactivity threshold', () => {
    const service = new RoomService()

    // These should all be well above the threshold by default
    service.rooms['dummy1'] = new Room('dummy1')
    service.rooms['dummy2'] = new Room('dummy2')
    service.rooms['dummy3'] = new Room('dummy3')

    expect(Object.values(service.rooms)).toHaveLength(3)

    // None should be purged
    service.purgeInactiveRooms()
    expect(Object.values(service.rooms)).toHaveLength(3)
  })
})
