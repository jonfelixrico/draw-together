import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  loading: boolean
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    loading: false,
  } as UiState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
  },
})

export const UiActions = uiSlice.actions
export default uiSlice.reducer
