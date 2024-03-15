import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { useConnectedUsers } from './hooks/connected-users.hook'
import { useMemo } from 'react'
import sortBy from 'lodash/sortBy'
import { useMeasure } from 'react-use'
import PadContentRenderer from '@/components/pad/PadContentRenderer'
import { PadInput } from '@/components/pad/PadInput'
import DrawServiceProvider from './service/DrawServiceProvider'
import { usePathSocketWatcher } from './service/socket-path-watcher.hook'
import PadPathControl from '@/components/pad/PadPathControl'

export default function RoomContent () {
  const users = useConnectedUsers()
  const userList = useMemo(() => {
    return sortBy(Object.values(users), ({ name }) => name)
  }, [users])
  const [ref, dimensions] = useMeasure<HTMLDivElement>()
  usePathSocketWatcher()

  return <Container data-cy="room-page" className='vh-100' style={{
    // touch-action: none is required to make drawing work for touchscreen devices
    touchAction: 'none'
  }}>
    <Row className="h-100">
      <Col xs="2" className='py-2'>
        <div className='h-100 d-flex flex-column justify-content-between'>
          <div>
            <div>Connected Users</div>
            <ol>
              {userList.map(({ id, name }) => <li key={id}>{name}</li>)}
            </ol>
          </div>

          <PadPathControl />
        </div>
      </Col>
      <Col className='border p-0'>
        {/* Intermediate div is present because we can't easily attach ref to Col */}
        <div className='h-100 position-relative' ref={ref}>
          <div className='position-absolute' style={{ zIndex: 2 }}>
            <DrawServiceProvider>
              <PadInput dimensions={dimensions} />
            </DrawServiceProvider>
          </div>

          <PadContentRenderer dimensions={dimensions} />
        </div>
      </Col>
    </Row>
  </Container>
}