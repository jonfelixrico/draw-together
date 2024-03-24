import ListGroup from 'react-bootstrap/ListGroup'
import { Participant } from './participants.types'
import { useParticipants } from './participants.hook'
import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Badge from 'react-bootstrap/Badge'
import { Else, If, Then } from 'react-if'

function ParticipantItem({ participant }: { participant: Participant }) {
  return (
    <ListGroup.Item data-cy={participant.id}>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">{participant.name}</Col>
        <Col xs="auto">
          <If condition={participant.isConnected}>
            <Then>
              <Badge bg="success" data-cy="online-badge">
                Online
              </Badge>
            </Then>
            <Else>
              <Badge bg="secondary" data-cy="offline-badge">
                Offline
              </Badge>
            </Else>
          </If>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

export default function ParticipantsList() {
  const participants = useParticipants()
  const asList = useMemo(() => {
    const values = Object.values(participants)
    return sortBy(values, (p) => p.name)
  }, [participants])

  return (
    <ListGroup data-cy="participants">
      {asList.map((p) => (
        <ParticipantItem participant={p} key={p.id} />
      ))}
    </ListGroup>
  )
}
