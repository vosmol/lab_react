// import React from 'react17';
// import { createRoot } from './renderer';
// import { ReactDOM } from 'react17';

// import { App } from './App';

// const root = document.getElementById('root') as HTMLElement;

// createRoot(root).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
