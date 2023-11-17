import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { storage } from './utils/storage.ts';
import { setAuthorizationHeader } from './api/customFetch.ts';
import { AuthProvider } from './context/AuthContext.tsx';

const accessToken = storage.get('accessToken');

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider initialLogged={!!accessToken}>
      <App />
    </AuthProvider>
    <ToastContainer position="top-center" className={'toast-message'} />
  </React.StrictMode>
);
