import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryProvider } from './lib/react-query/QueryProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

const clientId = import.meta.env.VITE_API_GOOGLE_CLIENT_ID
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <QueryProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </QueryProvider>
  </BrowserRouter>
);
