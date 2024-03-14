import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PathCreatedPayload, PathCreatingPayload, PathCreatingStartPayload } from "../typings/room-socket-code.types";

export type StatePathData = PathCreatedPayload

export type StateCreatingPathData = Omit<PathCreatingStartPayload, 'counter'> & {
  counter: number
}

export interface PadState {
  paths: {
    [id: string]: StatePathData
  }
  
  creatingPaths: {
    [id: string]: StateCreatingPathData
  },

  ownCreatingPathId: string | null
}

const INITIAL_STATE: PadState = {
  paths: {},
  creatingPaths: {},
  ownCreatingPathId: null
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
    },

    createOwnCreatingPath: (state, { payload }: PayloadAction<PathCreatingStartPayload>) => {
      state.creatingPaths[payload.id] = payload
      state.ownCreatingPathId = payload.id
    },

    appendPointToOwnCreatingPath: (state, { payload }: PayloadAction<Omit<PathCreatingPayload, 'id' | 'counter'>>) => {
      if (!state.ownCreatingPathId) {
        return
      }
      
      const inStore = state.creatingPaths[state.ownCreatingPathId]
      if (!inStore) {
        return
      }

      inStore.counter = inStore.counter + 1
      inStore.points.push(payload.point)
    },

    saveOwnPath: (state) => {
      const inStore = state.creatingPaths[state.ownCreatingPathId ?? 'UNKNOWN']
      if (!inStore) {
        return
      }

      state.paths[inStore.id] = inStore
      delete state.creatingPaths[inStore.id]
      state.ownCreatingPathId = null
    },
  }
})

export const PadActions = padSlice.actions

export default padSlice.reducer