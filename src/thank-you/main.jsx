import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/lato/latin-300.css'
import '@fontsource/lato/latin-400.css'
import '@fontsource/great-vibes/latin-400.css'
import './thank-you.css'
import ThankYouPage from './ThankYouPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThankYouPage />
  </StrictMode>,
)
