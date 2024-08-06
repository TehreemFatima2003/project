import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Store } from './redux/store.js';
import {Provider} from 'react-redux';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);

