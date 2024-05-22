import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './index.css';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container); // createRoot instead of render

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
