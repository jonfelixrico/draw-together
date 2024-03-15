import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PathData } from "../typings/pad.types";

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

    removeDraftPath: (state, { payload }: PayloadAction<string>) => {
      delete state.draftPaths[payload]
    }
  }
})

export const PadActions = padSlice.actions

export default padSlice.reducer
