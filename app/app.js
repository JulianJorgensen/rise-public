import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import styles from './styles/app.css';
import Main from './routes/index';

import {StripeProvider} from 'react-stripe-elements';

import createStore from './store/createStore';

const initialState = window.___INITIAL_STATE__;
const store = createStore(initialState);

// subscribe to the redux store
store.subscribe(() => {
  let state = store.getState();
  // console.log('New state', state);
});

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_live_YFoNx3keKp6d6unDR9SjFs2r">
      <Router>
        <Main />
      </Router>
    </StripeProvider>
  </Provider>,
  document.getElementById('app')
);
