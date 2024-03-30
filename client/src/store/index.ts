import { configureStore } from '@reduxjs/toolkit'
import padReducer from '../modules/pad-service/pad.slice'
import uiReducer from '../modules/ui/ui.slice'
import socketReducer from '../modules/socket/socket.slice'

const store = configureStore({
  reducer: {
    pad: padReducer,
    ui: uiReducer,
    socket: socketReducer,
  },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
