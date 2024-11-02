import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure you have Tailwind CSS setup here
import App from './App';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
