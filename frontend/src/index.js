import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './assets/css/App.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
