import { Point } from '@/modules/common/geometry.types'
import { PathData, RectangleData } from '@/modules/pad-common/pad.types'

export const PAD_SOCKET_EVENT = 'PAD'

export enum PadSocketCode {
  PATH_DRAFT_START = 'PATH_DRAFT_START',
  PATH_DRAFT_MOVE = 'PATH_DRAFT_MOVE',
  PATH_CREATE = 'PATH_CREATE',
  PATH_DELETE = 'PATH_DELETE',

  SHAPE_DRAFT_START = 'SHAPE_DRAFT_START',
  SHAPE_DRAFT_MOVE = 'SHAPE_DRAFT_MOVE',
  SHAPE_CREATE = 'SHAPE_CREATE',
  SHAPE_DELETE = 'SHAPE_DELETE',
}

export interface PathDraftStartPayload extends PathData {
  counter: number
}
interface PathDraftStart {
  [PadSocketCode.PATH_DRAFT_START]: PathDraftStartPayload
}

export interface PathDraftMovePayload {
  id: string
  counter: number
  point: Point
}
interface PathDraftMove {
  [PadSocketCode.PATH_DRAFT_MOVE]: PathDraftMovePayload
}

export type PathCreatePayload = PathData
interface PathCreate {
  [PadSocketCode.PATH_CREATE]: PathCreatePayload
}

export interface PathDeletePayload {
  id: string
}
interface PathDelete {
  [PadSocketCode.PATH_DELETE]: PathDeletePayload
}

export type ShapeDraftStartPayload = RectangleData
interface ShapeDraftStart {
  [PadSocketCode.SHAPE_DRAFT_START]: ShapeDraftStartPayload
}

export interface ShapeDraftMovePayload {
  focus: Point
  id: string
  counter: number
}
interface ShapeDraftMove {
  [PadSocketCode.SHAPE_DRAFT_MOVE]: ShapeDraftMovePayload
}

export type ShapeCreatePayload = RectangleData
interface ShapeCreate {
  [PadSocketCode.SHAPE_CREATE]: ShapeCreatePayload
}

export interface ShapeDeletePayload {
  id: string
}
interface ShapeDelete {
  [PadSocketCode.SHAPE_DELETE]: ShapeDeletePayload
}

export type PadResponse = Partial<
  PathDraftStart &
    PathDraftMove &
    PathCreate &
    PathDelete &
    ShapeDraftStart &
    ShapeDraftMove &
    ShapeCreate &
    ShapeDelete
>
export type PadRequest = PadResponse
