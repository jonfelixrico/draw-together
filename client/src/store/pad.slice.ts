import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PathData } from "../typings/pad.types";
import { SetStateAction } from "react";

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

    mutateDraftPath: (state, payloadAction: PayloadAction<{
      id: string,
      action: SetStateAction<PathData>
    }>) => {
      const { action, id } = payloadAction.payload
      
      const draft = state.draftPaths[id]
      if (!draft) {
        console.warn('Draft path %s not found', id)
        return
      }

      if (typeof action === 'object') {
        state.draftPaths[id] = action
      } else {
        state.draftPaths[id] = action(draft)
      }
    },

    removeDraftPath: (state, { payload }: PayloadAction<string>) => {
      delete state.draftPaths[payload]
    }
  }
})

export const PadActions = padSlice.actions

export default padSlice.reducer
