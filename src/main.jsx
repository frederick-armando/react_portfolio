import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import { ThemeProvider } from './theme/ThemeContext.jsx';
import './styles/shell-home.css';

console.info(
  `%c🚀 Portfolio v${__APP_VERSION__}`,
  'color: #385AF9; font-weight: bold; font-family: sans-serif; font-size: 11px; padding: 2px 4px;'
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  </React.StrictMode>
);
