import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './components/ui/ThemeProvider.jsx'

console.log('[main.jsx] Starting app initialization');

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('[main.jsx] Root element not found!');
} else {
  createRoot(rootElement).render(
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  )
  console.log('[main.jsx] Render complete');
}
