import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './App'
import './index.css'

// Na aula o professor concentra as pages tudo no main, irei deixar o main somente para os providers caso tenha. E no app para as pages ou routes
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
