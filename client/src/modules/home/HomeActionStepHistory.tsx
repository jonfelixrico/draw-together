import Card from 'react-bootstrap/Card'
import { Else, If, Then } from 'react-if'
import { useLiveQuery } from 'dexie-react-hooks'
import { roomDb } from '@/modules/room/room.db'

export default function HomeActionStepHistory() {
  const rooms = useLiveQuery(async () => {
    return await roomDb.rooms.toArray()
  })

  return (
    <Card>
      <Card.Body>
        <Card.Title>Join History</Card.Title>
        <If condition={rooms?.length}>
          <Then>{rooms?.map((room) => JSON.stringify(room))}</Then>
          <Else>No items to show</Else>
        </If>
      </Card.Body>
    </Card>
  )
}
