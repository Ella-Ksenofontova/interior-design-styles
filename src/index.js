import React from 'react';
import ReactDOM from 'react-dom/client';

import App from "./App"
import { HashRouter } from 'react-router-dom';

const router = ReactDOM.createRoot(document.getElementById('router'));
router.render(
  <React.StrictMode>
    <HashRouter basename='interior-design-styles'>
      <App />
    </HashRouter>
  </React.StrictMode>
);