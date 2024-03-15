import { configureStore } from "@reduxjs/toolkit"
import padReducer from './pad-path.slice'

const store = configureStore({
  reducer: {
    padPath: padReducer
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
