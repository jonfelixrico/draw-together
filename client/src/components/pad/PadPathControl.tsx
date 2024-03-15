import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PathColor } from '../../typings/pad.types';
import { PadPathActions, selectColor, selectThickness } from '../../store/pad-path.slice';
import Slider from '@/re-export/Slider';

export default function PadPathControl () {
  const dispatch = useAppDispatch()
  
  const color = useAppSelector(selectColor)
  const thickness = useAppSelector(selectThickness)

  function setColor (color: PathColor) {
    dispatch(PadPathActions.setColor(color))
  }

  function setThickness (thickness: number) {
    dispatch(PadPathActions.setThickness(thickness))
  }

  return <Row>
    <Col xs="auto">
      <Form.Control
        type='color'
        onChange={event => setColor(event.target.value)}
        value={color}
      />
    </Col>

    <Col>
      <Slider
        value={thickness}
        onChange={value => setThickness(value as number)}
        min={1}
        max={100}
      />
    </Col>
  </Row>
}
