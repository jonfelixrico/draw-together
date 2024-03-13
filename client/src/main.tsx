import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import ReactRouterProvider from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactRouterProvider />
  </React.StrictMode>,
)
