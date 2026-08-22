import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Remove the pre-React hero shell once React has mounted.
// The shell showed the hero poster while JS was loading —
// React's VideoBackground renders the identical poster,
// so removing the shell is visually seamless.
const shell = document.getElementById('hero-shell')
if (shell) {
  shell.remove()
}
