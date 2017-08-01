import React from 'react';
import { get } from 'lodash';
import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
// import { browserHistory } from 'react-router';
import { DASHBOARD_PATH, GETTING_STARTED_PATH, NOT_AUTHORIZED_PATH } from 'app/constants';
import { pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
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
  allowRedirectBack: false,
  authenticatedSelector: ({ firebase }) => {
    const user = pathToJS(firebase, 'profile');
    return isLoaded(user);
  },
  authenticatingSelector: ({ firebase }) =>
    (pathToJS(firebase, 'auth') === undefined) ||
    (pathToJS(firebase, 'isInitializing') === true),
  // AuthenticatingComponent: LoadingSpinner,
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
  redirectPath: '/login',
  allowRedirectBack: false,
  authenticatedSelector: ({ firebase }) => {
    const user = pathToJS(firebase, 'profile');
    return isEmpty(user);
  },
  authenticatingSelector: ({ firebase }) =>
    (pathToJS(firebase, 'auth') === undefined) ||
    (pathToJS(firebase, 'isInitializing') === true),
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectAction: newLoc => (dispatch) => {
    // browserHistory.replace(newLoc)
    console.log('user IS authenticated, redirect to : ', newLoc.pathname);
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
    const account = pathToJS(firebase, 'profile');
    const auth = pathToJS(firebase, 'auth');
    return (!isEmpty(account) && isLoaded(account) && get(account, `role.${permission}`, false));
  },
  // predicate: auth => get(auth, `user.role.${permission}`, false),
  authenticatingSelector: ({ firebase }) =>
      (pathToJS(firebase, 'auth') === undefined)
      || (pathToJS(firebase, 'profile') === undefined)
      || (pathToJS(firebase, 'isInitializing') === true),
  // AuthenticatingComponent: LoadingSpinner,
  redirectAction: newLoc => (dispatch) => {
    // browserHistory.replace(newLoc);
    // dispatch({ type: UNAUTHED_REDIRECT });
  },
  redirectPath: '/not-authorized',
  allowRedirectBack: false,
  wrapperDisplayName: 'UserHasPermission'
});

export default {
  userIsAuthenticated,
  userIsNotAuthenticated,
  userHasPermission
}
