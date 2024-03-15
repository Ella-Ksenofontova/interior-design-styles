import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "./App"
import { BrowserRouter, HashRouter } from 'react-router-dom';

const router = ReactDOM.createRoot(document.getElementById('router'));
router.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);