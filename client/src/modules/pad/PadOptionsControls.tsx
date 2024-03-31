import { PadActions } from '@/modules/pad-common/pad.slice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Stack from 'react-bootstrap/Stack'
import { HexColorPicker } from 'react-colorful'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Slider from '@/lib/Slider'

export default function PadOptionsControls() {
  const color = useAppSelector((root) => root.pad.options.color)
  const thickness = useAppSelector((root) => root.pad.options.thickness)
  const dispatch = useAppDispatch()

  return (
    <Stack gap={3}>
      <Row className="align-items-center">
        <Col xs="auto">Thickness</Col>

        <Col>
          <Slider
            value={thickness}
            onChange={(newThickness) =>
              dispatch(PadActions.setThickness(newThickness as number))
            }
            min={1}
            max={100}
          />
        </Col>
      </Row>

      <div className="px-2">
        <HexColorPicker
          className="w-100"
          color={color}
          onChange={(newColor) => dispatch(PadActions.setColor(newColor))}
        />
      </div>
    </Stack>
  )
}
