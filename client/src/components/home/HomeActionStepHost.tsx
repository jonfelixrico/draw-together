import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useApiClient } from '../../hooks/api-client'
import { useNavigate } from 'react-router-dom'

interface ResponseBody {
  id: string
}

export default function HomeActionStepHost () {
  const api = useApiClient()
  const navigate = useNavigate()

  async function createRoomAndNavigate () {
    const { data } = await api.post<ResponseBody>('room')
    // TODO handle errors
    navigate(`rooms/${data.id}`)
  }

  return <Card className="h-100">
    <Card.Body className='d-flex flex-column justify-content-between'>
      <Card.Title className='text-center' as="h4">Host a Room</Card.Title>
      <Button className='w-100' onClick={createRoomAndNavigate}>Host Room</Button>
    </Card.Body>
  </Card>
}