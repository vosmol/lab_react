import React, { createElement } from 'react';
import { App } from './App';
import { createRoot } from './renderer';

console.log(App());
console.log(
  createElement(
    'div',
    { className: 'App' },
    createElement('div', null, createElement('p', null, 'hello'))
  )
);

const root = document.getElementById('root') as HTMLElement;

createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
