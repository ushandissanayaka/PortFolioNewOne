import React from 'react';
import ReactDOM from 'react-dom/client'; // Corrected this line
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';


// Use createRoot to render the application
 ReactDOM.createRoot(document.getElementById('root'))
.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
