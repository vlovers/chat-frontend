import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { Button } from 'antd';

import './index.css';
import App from './components/app';

import store from './redux/store';
ReactDOM.render(
  // <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  // </React.StrictMode>
  ,
  document.getElementById('root')
);

