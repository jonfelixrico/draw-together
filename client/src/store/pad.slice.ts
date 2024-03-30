import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PathColor, PathData } from '@/modules/pad/pad.types'
import { Point } from '@/modules/common/geometry.types'
import type { RootState } from '@/store'

export interface PadState {
  paths: {
    [id: string]: PathData
  }

  draftPaths: {
    [id: string]: PathData
  }

  pathOptions: {
    thickness: number
    color: PathColor
  }
}

const INITIAL_STATE: PadState = {
  paths: {},
  draftPaths: {},

  pathOptions: {
    thickness: 5,
    color: '#000000',
  },
}

export const padSlice = createSlice({
  name: 'pad',
  initialState: INITIAL_STATE,
  reducers: {
    setPath: (state, { payload }: PayloadAction<PathData>) => {
      state.paths[payload.id] = payload
    },

    setDraftPath: (state, { payload }: PayloadAction<PathData>) => {
      state.draftPaths[payload.id] = payload
    },

    addPointToDraftPath: (
      state,
      action: PayloadAction<{
        id: string
        point: Point
      }>
    ) => {
      const { point, id } = action.payload

      const draft = state.draftPaths[id]
      if (!draft) {
        console.warn('Draft path %s not found', id)
        return
      }

      draft.points.push(point)
    },

    removeDraftPath: (state, { payload }: PayloadAction<string>) => {
      delete state.draftPaths[payload]
    },

    setPathColor: (state, { payload }: PayloadAction<PathColor>) => {
      state.pathOptions.color = payload
    },

    setPathThickness: (state, { payload }: PayloadAction<number>) => {
      state.pathOptions.thickness = payload
    },
  },
})

export const PadActions = padSlice.actions

export default padSlice.reducer

export const selectThickness = ({ pad }: RootState) => pad.pathOptions.thickness
export const selectColor = ({ pad }: RootState) => pad.pathOptions.color
