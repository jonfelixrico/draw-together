import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PathColor, PathData } from "@/typings/pad.types";
import { Point } from "@/typings/geometry.types";
import type { RootState } from '@/store'

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
}

const INITIAL_STATE: PadState = {
  paths: {},
  draftPaths: {},

  options: {
    thickness: 5,
    color: '#000000'
  }
}

export const padPathSlice = createSlice({
  name: 'padPath',
  initialState: INITIAL_STATE,
  reducers: {
    setPath: (state, { payload }: PayloadAction<PathData>) => {
      state.paths[payload.id] = payload
    },

    setDraftPath: (state, { payload }: PayloadAction<PathData>) => {
      state.draftPaths[payload.id] = payload
    },

    addPointToDraftPath: (state, action: PayloadAction<{
      id: string,
      point: Point
    }>) => {
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

    setColor: (state, { payload }: PayloadAction<PathColor>) => {
      state.options.color = payload
    },

    setThickness: (state, { payload }: PayloadAction<number>) => {
      state.options.thickness = payload
    }
  }
})

export const PadPathActions = padPathSlice.actions

export default padPathSlice.reducer

export const selectThickness = ({ padPath }: RootState) => padPath.options.thickness
export const selectColor = ({ padPath }: RootState) => padPath.options.color
