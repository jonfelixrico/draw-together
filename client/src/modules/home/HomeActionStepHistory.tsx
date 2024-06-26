import { useLiveQuery } from 'dexie-react-hooks'
import { localDb } from '@/modules/common/db'
import ListGroup from 'react-bootstrap/ListGroup'
import sortBy from 'lodash/sortBy'
import HistoryEntry from '@/modules/home/HistoryEntry'
import HistoryLayout from '@/modules/home/HistoryLayout'

export default function HomeActionStepHistory() {
  const rooms = useLiveQuery(async () => {
    return sortBy(
      await localDb.rooms.toArray(),
      ({ lastOpened }) => lastOpened
    ).reverse()
  })

  async function deleteHistoryEntry(id: string) {
    const results = await localDb.rooms.where('id').equals(id).delete()
    if (results) {
      console.info('Room %s has been removed from the history', id)
    }
  }

  return (
    <div data-cy="history">
      <HistoryLayout
        noEntries={!rooms?.length}
        onClearConfirm={() => localDb.rooms.clear()}
      >
        <ListGroup>
          {rooms?.map((room) => (
            <ListGroup.Item key={room.id}>
              <HistoryEntry
                room={room}
                onDelete={() => deleteHistoryEntry(room.id)}
              />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </HistoryLayout>
    </div>
  )
}
