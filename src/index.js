import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from 'context/auth/AuthContext';
import { DarkModeProvider } from 'context/darkmode/DarkModeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  </AuthProvider>
);

reportWebVitals();
