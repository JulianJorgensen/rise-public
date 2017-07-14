import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { firebaseStateReducer, reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import locationReducer from './location';
import { reducer as form } from 'redux-form';
import makeRootReducer from './reducers';
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config';

export default (initialState = {}) => {
  // Build the middleware for intercepting and dispatching navigation actions
  const middleware = [
    thunk
  ];

  const reducer = combineReducers({
    // Add sync reducers here
    firebaseStateReducer,
    form,
    location: locationReducer,
  });

  firebase.initializeApp(fbConfig); // initialize firebase instance

  const store = createStore(
    makeRootReducer(),
    compose(
      reactReduxFirebase(firebase, reduxConfig),
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
};
