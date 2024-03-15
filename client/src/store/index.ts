import { configureStore } from "@reduxjs/toolkit"
import padReducer from './pad.slice'

const store = configureStore({
  reducer: {
    pad: padReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
