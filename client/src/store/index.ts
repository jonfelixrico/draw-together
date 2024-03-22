import { configureStore } from '@reduxjs/toolkit'
import padReducer from './pad-path.slice'
import uiReducer from './ui.slice'

const store = configureStore({
  reducer: {
    padPath: padReducer,
    ui: uiReducer
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
