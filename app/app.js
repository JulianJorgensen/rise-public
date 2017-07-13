import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import styles from './styles/app.css';
import fonts from './fonts/fonts.css';
import routes from './routes/index';

import createStore from './store_new/createStore';

const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// subscribe to the redux store
store.subscribe(() => {
  let state = store.getState();
  console.log('New state', state);
});

ReactDOM.render(
  <Provider store={store}>
    {routes}
  </Provider>,
  document.getElementById('app')
);
