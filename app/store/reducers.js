import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import locationReducer from './location';
import { reducer as form } from 'redux-form';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    form,
    location: locationReducer,
    ...asyncReducers
  })
}

export default makeRootReducer;
