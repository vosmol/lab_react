import React from 'react';
import { createRoot } from './renderer';

import { App } from './App';

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
