import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useApiClient } from '@/modules/common/api-client.hook'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@/modules/common/loading.hook'

interface ResponseBody {
  id: string
}

export default function HomeActionStepHost() {
  const api = useApiClient()
  const navigate = useNavigate()
  const { setLoading } = useLoading()

  async function createRoomAndNavigate() {
    setLoading(true)
    try {
      const { data } = await api.post<ResponseBody>('room')

      navigate(`rooms/${data.id}`)
      // We'll be leaving the closing of the loading overlay to the room page
    } catch (e) {
      // TODO show user-friendly error
      console.log('Error encoutnered room creation', e)
      setLoading(false)
    }
  }

  return (
    <Card className="h-100" data-cy="host-action">
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title className="text-center" as="h4">
          Host a Room
        </Card.Title>
        <Button className="w-100" onClick={createRoomAndNavigate}>
          Host Room
        </Button>
      </Card.Body>
    </Card>
  )
}
