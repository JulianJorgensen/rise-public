import React from 'react';
import { get } from 'lodash';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
// import { browserHistory } from 'react-router';
import { DASHBOARD_PATH, GETTING_STARTED_PATH, NOT_AUTHORIZED_PATH } from 'app/constants';
import { pathToJS } from 'react-redux-firebase';
import LoadingSpinner from 'components/LoadingSpinner';

const AUTHED_REDIRECT = 'AUTHED_REDIRECT';
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT';

/**
 * @description Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */

export const userIsAuthenticated = connectedReduxRedirect({
  redirectPath: '/dashboard',
  authenticatedSelector: ({ firebase }) => {
    const user = pathToJS(firebase, 'profile');
    if (user) {
      let populatedObj = { ...pathToJS(firebase, 'auth'), user };
      return populatedObj;
    }else{
      return false;
    }
  },
  authenticatingSelector: ({ firebase }) =>
    (pathToJS(firebase, 'auth') === undefined) ||
    (pathToJS(firebase, 'isInitializing') === true),
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsAuthenticated',
  redirectAction: newLoc => (dispatch) => {
    // browserHistory.replace(newLoc)
    dispatch({
      type: UNAUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    })
  }
})


/**
 * @description Higher Order Component that redirects to dashboard page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const userIsNotAuthenticated = connectedReduxRedirect({
  redirectPath: (state, props) =>
    // redirect to page user was on or to getting started page
    'login',
    // props.location.query.redirect || GETTING_STARTED_PATH,
  authenticatedSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    (pathToJS(firebase, 'auth') === undefined) ||
    (pathToJS(firebase, 'isInitializing') === true),
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectAction: newLoc => (dispatch) => {
    // browserHistory.replace(newLoc)
    dispatch({ type: AUTHED_REDIRECT })
  }
})


/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */

export const userHasPermission = permission => connectedReduxRedirect({
  authenticatedSelector: ({ firebase }) => {
    const user = pathToJS(firebase, 'profile');
    console.log('figuring out if is authenticated', user);
    if (user) {
      let populatedObj = { ...pathToJS(firebase, 'auth'), user };
      console.log('populatedObj', populatedObj);

      // check if has permission using lodash
      if (get(auth, `user.role.${permission}`, false)){
      }

      return populatedObj;
    }else{
      return false;
    }
  },
  // predicate: auth => get(auth, `user.role.${permission}`, false),
  authenticatingSelector: ({ firebase }) =>
      (pathToJS(firebase, 'auth') === undefined)
      || (pathToJS(firebase, 'profile') === undefined)
      || (pathToJS(firebase, 'isInitializing') === true),
  AuthenticatingComponent: LoadingSpinner,
  redirectAction: newLoc => (dispatch) => {
    // browserHistory.replace(newLoc);
    dispatch({ type: UNAUTHED_REDIRECT });
  },
  redirectPath: `${NOT_AUTHORIZED_PATH}`,
  wrapperDisplayName: 'UserHasPermission',
  allowRedirectBack: false
});

export default {
  userIsAuthenticated,
  userIsNotAuthenticated,
  userHasPermission
}
