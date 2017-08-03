import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import { reducer as form } from 'redux-form';
import notification from './notification';
import snackbar from './snackbar';
import meetings from './meetings';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    form,
    notification,
    snackbar,
    meetings,
    ...asyncReducers
  })
}

export default makeRootReducer;
