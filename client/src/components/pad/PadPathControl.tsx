import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { PathColor } from '../../typings/pad.types';
import { PadPathActions } from '../../store/pad-path.slice';

export default function PadPathControl () {
  const dispatch = useAppDispatch()
  
  const color = useAppSelector(state => state.padPath.options.color)

  function setColor (color: PathColor) {
    dispatch(PadPathActions.setColor(color))
  }

  return <Row>
    <Col>
      <Form.Control
        type='color'
        onChange={event => setColor(event.target.value)}
        value={color}
      />
    </Col>
  </Row>
}
