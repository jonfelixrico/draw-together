import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PathColor, PathData } from "../typings/pad.types";
import { Point } from "../typings/geometry.types";

export interface PadState {
  paths: {
    [id: string]: PathData
  }

  draftPaths: {
    [id: string]: PathData
  }

  settings: {
    thickness: number
    color: PathColor
  }
}

const INITIAL_STATE: PadState = {
  paths: {},
  draftPaths: {},

  settings: {
    thickness: 5,
    color: 'black'
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
      state.settings.color = payload
    },

    setThickness: (state, { payload }: PayloadAction<number>) => {
      state.settings.thickness = payload
    }
  }
})

export const PadPathActions = padPathSlice.actions

export default padPathSlice.reducer
