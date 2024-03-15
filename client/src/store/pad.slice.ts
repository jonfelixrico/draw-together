import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PathData } from "../typings/pad.types";

export interface PadState {
  paths: {
    [id: string]: PathData
  }

  localDraftPath: PathData | null
}

const INITIAL_STATE: PadState = {
  paths: {},
  localDraftPath: null
}

export const padSlice = createSlice({
  name: 'pad',
  initialState: INITIAL_STATE,
  reducers: {
    setPath: (state, { payload }: PayloadAction<PathData>) => {
      state.paths[payload.id] = payload
    },

    setLocalDraftPath: (state, { payload }: PayloadAction<PathData>) => {
      state.localDraftPath = payload
    },
    

    removeLocalDraftPath: (state) => {
      state.localDraftPath = null
    }
  }
})

export const PadActions = padSlice.actions

export default padSlice.reducer
