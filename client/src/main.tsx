import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'
import App from './App.tsx'
import ReactRouterProvider from './router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactRouterProvider />
    <App />
  </React.StrictMode>,
)
