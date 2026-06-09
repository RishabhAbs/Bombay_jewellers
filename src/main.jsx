import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary.jsx'

// When running inside the APK (Capacitor native), route all /api/ calls to the AWS backend
if (window.Capacitor?.isNativePlatform?.()) {
  const AWS_BASE = 'http://bombay-prod.eba-ycxwyijr.ap-south-1.elasticbeanstalk.com';
  const _fetch = window.fetch.bind(window);
  window.fetch = (url, opts) => {
    if (typeof url === 'string' && url.startsWith('/api/')) {
      return _fetch(AWS_BASE + url, opts);
    }
    return _fetch(url, opts);
  };
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)

