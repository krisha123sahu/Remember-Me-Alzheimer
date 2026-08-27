import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// 🔔 Register Service Worker (clean + safe)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then((registration) => {
      console.log("✅ Service Worker Registered:", registration);
    })
    .catch((error) => {
      console.error("❌ Service Worker Registration Failed:", error);
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);