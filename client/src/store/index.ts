import { configureStore } from '@reduxjs/toolkit'
import padReducer from './pad-path.slice'
import uiReducer from './ui.slice'
import socketReducer from './socket.slice'

const store = configureStore({
  reducer: {
    padPath: padReducer,
    ui: uiReducer,
    socket: socketReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
