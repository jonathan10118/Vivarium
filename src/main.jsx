import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider, PetProvider } from './contexts';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <PetProvider>
        <App />
      </PetProvider>
    </AuthProvider>
  </React.StrictMode>
);
