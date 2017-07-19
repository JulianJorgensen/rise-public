import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { firebaseStateReducer, reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import { reducer as form } from 'redux-form';
import makeRootReducer from './reducers';
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config';

export default (initialState = {}) => {
  // Build the middleware for intercepting and dispatching navigation actions
  const middleware = [
    thunk.withExtraArgument(getFirebase)
  ];

  const enhancers = [];
  if (ENV_CONFIG.ENV === 'development') {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      reactReduxFirebase(fbConfig, reduxConfig),
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};

  return store;
};
