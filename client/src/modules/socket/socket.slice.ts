import { Participant } from '@/modules/participants/participants.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SocketSlice {
  participants: Record<string, Participant>
}

const INITIAL_STATE: SocketSlice = {
  participants: {},
}

// TODO rename to room slice
export const socketSlice = createSlice({
  name: 'socket',
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
  },
})

export const SocketActions = socketSlice.actions
export default socketSlice.reducer
