import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import { reducer as form } from 'redux-form';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    form,
    ...asyncReducers
  })
}

export default makeRootReducer;
