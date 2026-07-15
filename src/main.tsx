import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import i18n from './i18n';
import './index.css';

const mountApp = () => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  requestAnimationFrame(() => {
    document.dispatchEvent(new Event('render-event'));
  });
};

if (i18n.isInitialized) {
  mountApp();
} else {
  i18n.on('initialized', mountApp);
}
