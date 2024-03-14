import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PathData } from "../typings/pad.types";
import { PathCreatingPayload, PathCreatingStartPayload } from "../typings/room-socket-code.types";

export interface StatePathData extends PathData {
  createTs: Date
  id: string
}

export type StateCreatingPathData = Omit<PathCreatingStartPayload, 'counter'> & {
  counter: number
}

export interface PadState {
  paths: {
    [id: string]: StatePathData
  }
  
  creatingPaths: {
    [id: string]: StateCreatingPathData
  }
}

const INITIAL_STATE: PadState = {
  paths: {},
  creatingPaths: {}
}

export const padSlice = createSlice({
  name: 'pad',
  initialState: INITIAL_STATE,
  reducers: {
    savePath: (state, { payload }: PayloadAction<StatePathData>) => {
      state.paths[payload.id] = payload
      delete state.creatingPaths[payload.id]
    },

    createCreatingPath: (state, { payload }: PayloadAction<PathCreatingStartPayload>) => {
      state.creatingPaths[payload.id] = payload
    },

    appendPointToCreatingPath: (state, { payload }: PayloadAction<PathCreatingPayload>) => {
      const inStore = state.creatingPaths[payload.id]
      if (!inStore) {
        return
      }

      inStore.counter = payload.counter
      inStore.points.push(payload.point)
    }
  }
})

export const PadActions = padSlice.actions

export default padSlice.reducer