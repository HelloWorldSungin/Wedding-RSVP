import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './tables.css'
import TablesPage from './TablesPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TablesPage />
  </StrictMode>,
)
