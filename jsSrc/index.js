'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Components/app';
import configureStore from './Store/configureStore';
import '../cssSrc/index.styl';

if (process.env.NODE_ENV !== 'production') {
  console.log('development mode');
} else {
  console.log('Упоротость и качество!');
}

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);