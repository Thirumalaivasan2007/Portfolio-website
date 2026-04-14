import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import AdvancedLoader from './components/AdvancedLoader.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdvancedLoader>
      <App />
    </AdvancedLoader>
  </StrictMode>,
)
