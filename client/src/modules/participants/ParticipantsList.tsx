import ListGroup from 'react-bootstrap/ListGroup'
import { Participant } from './participants.types'
import { useParticipants } from './participants.hook'
import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'

function ParticipantItem({ participant }: { participant: Participant }) {
  return <ListGroup.Item>
    {participant.name}
    {participant.isConnected}
  </ListGroup.Item>
}

export default function ParticipantsList() {
  const participants = useParticipants()
  const asList = useMemo(() => {
    const values = Object.values(participants)
    return sortBy(values, p => p.name)
  }, [participants])

  return <ListGroup>
    {asList.map(p => <ParticipantItem participant={p} key={p.id} />)}  
  </ListGroup>
}
