import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--surface)',
            color: 'var(--text)',
            border: '1px solid var(--border)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '16px 20px',
            fontSize: '13px',
            fontFamily: 'monospace',
            maxWidth: '380px',
          },
          success: {
            iconTheme: { primary: '#4ade80', secondary: 'var(--surface)' },
            style: { border: '1px solid rgba(34,197,94,0.25)' },
          },
          error: {
            iconTheme: { primary: '#f87171', secondary: 'var(--surface)' },
            style: { border: '1px solid rgba(239,68,68,0.25)' },
          },
        }}
      />
    </ThemeProvider>
  </StrictMode>,
)