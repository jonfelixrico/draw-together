import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

export default function HomeActionStepHost () {
  return <Card className="h-100">
    <Card.Body className='d-flex flex-column justify-content-between'>
      <Card.Title className='text-center' as="h4">Host a Room</Card.Title>
      <Button className='w-100'>Host Room</Button>
    </Card.Body>
  </Card>
}