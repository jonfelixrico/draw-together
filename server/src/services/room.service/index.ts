import { RoomService } from './room-service.class'

const service = new RoomService()
service.start()
console.log('Spawned room service')

export default service
