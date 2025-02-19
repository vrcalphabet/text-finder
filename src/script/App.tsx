import React from 'react';
import ReactDOM from 'react-dom/client';
import OverlayContainer from './OverlayContainer';

const container = document.createElement('div');
container.id = 'text-finder';
document.body.append(container);

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <OverlayContainer />
  </React.StrictMode>
);
