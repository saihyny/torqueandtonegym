import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { injectCriticalCSS, preloadNonCriticalCSS } from './lib/critical-css'
import { initServiceWorker } from './lib/service-worker'
import './index.css'

// PERFORMANCE OPTIMIZATION: Inject critical CSS immediately
injectCriticalCSS();

// Preload non-critical CSS for better caching
preloadNonCriticalCSS();

// Initialize service worker for advanced caching
if (import.meta.env.PROD) {
  initServiceWorker().catch(console.error);
}

createRoot(document.getElementById("root")!).render(<App />);
