import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import { reducer as form } from 'redux-form';
import notifications from './notifications';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    form,
    notifications,
    ...asyncReducers
  })
}

export default makeRootReducer;
