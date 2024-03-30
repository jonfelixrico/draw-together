import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import ReactRouterProvider from './router'
import { Provider } from 'react-redux'
import store from './store'
import LoadingProvider from './modules/ui/LoadingProvider'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LoadingProvider>
        <ReactRouterProvider />
      </LoadingProvider>
    </Provider>
  </React.StrictMode>
)
