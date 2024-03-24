import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ConnectedParticipant {
  id: string
  isConnected: boolean
  name: string
}

interface SocketSlice {
  participants: Record<string, ConnectedParticipant>
}

export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    participants: {},
  } as SocketSlice,
  reducers: {
    setParticipant: (
      state,
      { payload }: PayloadAction<ConnectedParticipant>
    ) => {
      state.participants[payload.id] = payload
    },

    setParticipants: (
      state,
      { payload }: PayloadAction<ConnectedParticipant[]>
    ) => {
      for (const participant of payload) {
        state.participants[participant.id] = participant
      }
    },
  },
})

export const SocketActions = socketSlice.actions
export default socketSlice.reducer
