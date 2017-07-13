import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import makeRootReducer from './reducers';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config';
import { version } from '../../package.json';
import { updateLocation } from './location';

export default (initialState = {}) => {
  // Build the middleware for intercepting and dispatching navigation actions
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  // Add the reducer to your store on the `router` key
  // Also apply our middleware for navigating
  const store = createStore(
    makeRootReducer(),
    compose(
      reactReduxFirebase(fbConfig, reduxConfig),
      applyMiddleware(...middleware),
    )
  )
  store.asyncReducers = {}

  return store;
}
