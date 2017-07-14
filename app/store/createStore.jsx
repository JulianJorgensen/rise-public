import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { firebaseStateReducer as firebase, reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import thunk from 'redux-thunk';
import locationReducer from './location';
import { reducer as form } from 'redux-form';
import makeRootReducer from './reducers';
import { firebase as fbConfig, reduxFirebase as reduxConfig } from '../config';

export default (initialState = {}) => {
  // Build the middleware for intercepting and dispatching navigation actions
  const middleware = [
    thunk.withExtraArgument(getFirebase)
    // This is where you add other middleware like redux-observable
  ]

  const reducer = combineReducers({
    // Add sync reducers here
    firebase,
    form,
    location: locationReducer,
  });

  const store = createStore(
    makeRootReducer(),
    compose(
      reactReduxFirebase(fbConfig, reduxConfig),
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
};
