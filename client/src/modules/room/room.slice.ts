import { Dimensions } from '@/modules/common/geometry.types'
import { Participant } from '@/modules/participants/participants.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface RoomSlice {
  participants: Record<string, Participant>
  name: string

  padDimensions: Dimensions
}

const INITIAL_STATE: RoomSlice = {
  participants: {},
  name: '',

  /*
   * TODO add reducers once we allow configuration
   * For now, this is hard-coded since users can't change the pad dimensions anyway
   */
  padDimensions: {
    width: 1920,
    height: 1080,
  },
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
