import { Dimensions } from '@/modules/common/geometry.types'
import { Participant } from '@/modules/participants/participants.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RoomSlice {
  participants: Record<string, Participant>
  name: string

  viewportDimensions: Dimensions
  padDimensions: Dimensions
  scale: number
}

const INITIAL_STATE: RoomSlice = {
  participants: {},
  name: '',

  viewportDimensions: {
    width: 1920,
    height: 1080,
  },

  padDimensions: {
    width: 1920,
    height: 1080,
  },

  scale: 1,
}

const roomSlice = createSlice({
  name: 'room',
  initialState: INITIAL_STATE,
  reducers: {
    resetSlice: () => INITIAL_STATE,

    setParticipant: (state, { payload }: PayloadAction<Participant>) => {
      state.participants[payload.id] = payload
    },

    setParticipants: (state, { payload }: PayloadAction<Participant[]>) => {
      for (const participant of payload) {
        state.participants[participant.id] = participant
      }
    },

    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload
    },

    setViewportDimensions: (state, action: PayloadAction<Dimensions>) => {
      state.viewportDimensions = action.payload
    },

    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload
    },
  },
})

export const RoomActions = roomSlice.actions
export default roomSlice.reducer
