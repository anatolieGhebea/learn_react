import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from './App.jsx'
import { PartnersProvider } from './context/PartnersContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PartnersProvider>
      <App />
    </PartnersProvider>
  </StrictMode>,
)
