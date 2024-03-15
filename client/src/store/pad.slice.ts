import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PathData } from "../typings/pad.types";
import { Point } from "../typings/geometry.types";

export interface PadState {
  paths: {
    [id: string]: PathData
  }

  draftPaths: {
    [id: string]: PathData
  }
}

const INITIAL_STATE: PadState = {
  paths: {},
  draftPaths: {}
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
    }
  }
})

export const PadActions = padSlice.actions

export default padSlice.reducer
