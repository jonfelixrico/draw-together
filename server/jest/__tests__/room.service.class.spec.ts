// TODO support absolute paths. these are a mess.
import { INACTIVITY_THRESHOLD, RoomService } from '../../../server/src/services/room.service/room-service.class'
import { Room } from '../../src/services/room.service/room.class'

describe('room-service', () => {
  it('purges rooms past the inactivity threshold', () => {
    const room = new Room('room_id')
    // Forces lastActivityTs to be way past the inactivity threshold
    jest.spyOn(room, 'lastActivityTs', 'get')
      .mockReturnValue(Date.now() - INACTIVITY_THRESHOLD * 2)

    const service = new RoomService()
    service.rooms['room_id'] = room

    expect(service.rooms).toEqual(expect.objectContaining({
      'room_id': expect.any(Room)
    }))

    service.purgeInactiveRooms()

    expect(service.rooms).toEqual(
      expect.not.objectContaining({
        'room_id': expect.any(Room)
      })
    )
  })
})
