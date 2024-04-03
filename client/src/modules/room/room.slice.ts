import { Participant } from '@/modules/participants/participants.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RoomSlice {
  participants: Record<string, Participant>
  name: string
}

const INITIAL_STATE: RoomSlice = {
  participants: {},
  name: '',
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
  },
})

export const RoomActions = roomSlice.actions
export default roomSlice.reducer
