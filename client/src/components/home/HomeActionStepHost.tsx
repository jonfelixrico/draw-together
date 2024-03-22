import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { useApiClient } from '@/hooks/api-client.hook'
import { useNavigate } from 'react-router-dom'
import { useLoading } from '@/hooks/loading.hook'

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
      /*
       * We're not doing setLoading(false) for the success use case because we'll let
       * the rooms/:id route to clean it up for us.
       * 
       * This is also a UX-related measure. If we hide the spinner on the success case and
       * somehow the spinner in the room page got delayed, the user will be able to perceive
       * a brief moment of unresponsiveness.
       * 
       * Room pag spinner can get delayed if the room page code is still being lazy-loaded.
       */
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
