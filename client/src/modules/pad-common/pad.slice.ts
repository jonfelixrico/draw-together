import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { PadCursor, PathColor, PathData } from '@/modules/pad-common/pad.types'
import { Point } from '@/modules/common/geometry.types'
import type { RootState } from '@/store'
import clamp from 'lodash/clamp'
import {
  MAX_THICKNESS,
  MIN_THICKNESS,
} from '@/modules/pad-common/pad-options.utils'

export interface PadState {
  paths: {
    [id: string]: PathData
  }

  draftPaths: {
    [id: string]: PathData
  }

  options: {
    thickness: number
    color: PathColor
  }

  cursors: {
    [id: string]: PadCursor
  }
}

const INITIAL_STATE: PadState = {
  paths: {},
  draftPaths: {},

  options: {
    thickness: 5,
    color: '#000000',
  },

  cursors: {},
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

    removePath: (state, { payload }: PayloadAction<string>) => {
      delete state.paths[payload]
    },

    setColor: (state, { payload }: PayloadAction<PathColor>) => {
      state.options.color = payload
    },

    setThickness: (state, { payload }: PayloadAction<number>) => {
      state.options.thickness = payload
    },

    incrementThickness: ({ options }, { payload }: PayloadAction<number>) => {
      options.thickness = clamp(
        options.thickness + payload,
        MIN_THICKNESS,
        MAX_THICKNESS
      )
    },

    setCursor: (state, { payload }: PayloadAction<PadCursor>) => {
      state.cursors[payload.id] = payload
    },

    clearCursor: (state, { payload }: PayloadAction<string>) => {
      delete state.cursors[payload]
    },

    resetSlice: () => INITIAL_STATE,
  },
})

export const PadActions = padSlice.actions

export default padSlice.reducer

export const selectThickness = ({ pad }: RootState) => pad.options.thickness
export const selectColor = ({ pad }: RootState) => pad.options.color
