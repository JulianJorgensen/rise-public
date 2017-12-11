import { combineReducers } from 'redux';
import { firebaseStateReducer as firebase } from 'react-redux-firebase';
import { reducer as form } from 'redux-form';
import notification from './notification';
import snackbar from './snackbar';
import meetings from './meetings';
import site from './site';

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    firebase,
    form,
    notification,
    snackbar,
    meetings,
    site,
    ...asyncReducers
  })
}

export default makeRootReducer;
