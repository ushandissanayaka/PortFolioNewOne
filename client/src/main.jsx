import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrected this line
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';

// Use createRoot to render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
