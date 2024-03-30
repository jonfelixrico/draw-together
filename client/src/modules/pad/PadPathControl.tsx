import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { PathColor } from '@/modules/pad/pad.types'
import {
  PadActions,
  selectColor,
  selectThickness,
} from '@/modules/pad-service/pad.slice'
import Slider from '@/lib/Slider'

export default function PadPathControl() {
  const dispatch = useAppDispatch()

  const color = useAppSelector(selectColor)
  const thickness = useAppSelector(selectThickness)

  function setColor(color: PathColor) {
    dispatch(PadActions.setPathColor(color))
  }

  function setThickness(thickness: number) {
    dispatch(PadActions.setPathThickness(thickness))
  }

  return (
    <Row>
      <Col xs="auto">
        <Form.Control
          type="color"
          onChange={(event) => setColor(event.target.value)}
          value={color}
        />
      </Col>

      <Col className="d-flex flex-column justify-content-center">
        <Slider
          value={thickness}
          onChange={(value) => setThickness(value as number)}
          min={1}
          max={100}
        />
      </Col>
    </Row>
  )
}
