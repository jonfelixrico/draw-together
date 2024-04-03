import { Participant } from '@/modules/participants/participants.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SocketSlice {
  participants: Record<string, Participant>
}

// TODO rename to room slice
export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    participants: {},
  } as SocketSlice,
  reducers: {
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
