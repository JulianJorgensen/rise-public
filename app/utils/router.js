import React from 'react';
import { withRouter } from 'react-router';
import { get } from 'lodash';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect';

// import { browserHistory } from 'react-router';
import { DASHBOARD_PATH, GETTING_STARTED_PATH, NOT_AUTHORIZED_PATH } from 'app/constants';
import { dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { locationChange } from 'store/location';
import LoadingSpinner from 'components/LoadingSpinner';

const AUTHED_REDIRECT = 'AUTHED_REDIRECT';
const UNAUTHED_REDIRECT = 'UNAUTHED_REDIRECT';

const locationHelper = locationHelperBuilder();

/**
 * @description Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */

export const userHasBeenSetup = connectedRouterRedirect({
  authenticatingSelector: ({ firebase }) => {
    let auth = pathToJS(firebase, 'auth');
    let profile = pathToJS(firebase, 'profile');
    let status = !isLoaded(auth) || !isLoaded(profile);
    return status;
  },
  AuthenticatingComponent: LoadingSpinner,
  redirectPath: '/getting-started',
  allowRedirectBack: false,
  authenticatedSelector: ({ firebase }) => {
    let profile = pathToJS(firebase, 'profile');
    console.log('userapproved? ', profile.role.status === 'confirmed');
    return profile.role.status === 'confirmed';
  },
  wrapperDisplayName: 'UserIsGettingStarted'
})

/**
 * @description Higher Order Component that redirects to `/login` instead
 * rendering if user is not authenticated (default of redux-auth-wrapper).
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatingSelector: ({ firebase }) => {
    let auth = pathToJS(firebase, 'auth');
    let profile = pathToJS(firebase, 'profile');
    let status = !isLoaded(auth) || !isLoaded(profile);
    console.log('authenticating!', status);
    return status;
  },
  AuthenticatingComponent: LoadingSpinner,
  redirectPath: (state, ownProps) => {
    console.log('user is NOT authenticated, so redirecting!');
    console.log('^^^ this ', this);
    console.log('^^^ state ', state);
    console.log('^^^ ownProps ', ownProps);
    console.log('^^^ locationHelper.getRedirectQueryParam(ownProps) ', locationHelper.getRedirectQueryParam(ownProps));
    console.log('\n\n\n');
    return locationHelper.getRedirectQueryParam(ownProps) || '/login';
  },
  allowRedirectBack: true,
  authenticatedSelector: ({ firebase }) => {
    let auth = pathToJS(firebase, 'auth');
    let profile = pathToJS(firebase, 'profile');
    let status = isLoaded(auth) && !isEmpty(profile);
    console.log('authenticatedSelector', status);
    return status;
  },
  wrapperDisplayName: 'UserIsAuthenticated'
})

/**
 * @description Higher Order Component that redirects to dashboard page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const userIsNotAuthenticated = connectedRouterRedirect({
  authenticatingSelector: ({ firebase }) => {
    let auth = pathToJS(firebase, 'auth');
    let status = !isLoaded(auth);
    console.log('authenticating UserIsNotAuthenticated!', status);
    return status;
  },
  authenticatedSelector: ({ firebase }) => {
    let auth = pathToJS(firebase, 'auth');
    let status = isEmpty(auth);
    console.log('authenticatedSelector userIsNotAuthenticated', status);
    return status;
  },
  AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsNotAuthenticated',
  redirectPath: (state, ownProps) => {
    console.log('user IS authenticated, so redirect!');
    console.log('^^^ this ', this);
    console.log('^^^ state ', state);
    console.log('^^^ ownProps ', ownProps);
    console.log('^^^ locationHelper.getRedirectQueryParam(ownProps) ', locationHelper.getRedirectQueryParam(ownProps));
    console.log('\n\n\n');
    return '/dashboard';
  },
  allowRedirectBack: false
})


/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */

export const userHasPermission = permission => connectedRouterRedirect({
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
  wrapperDisplayName: 'UserHasPermission',
  redirectPath: '/not-authorized',
  allowRedirectBack: false
});


/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */

export const userIsAdmin = connectedRouterRedirect({
  authenticatedSelector: ({ firebase }) => {
    const account = pathToJS(firebase, 'profile');
    const auth = pathToJS(firebase, 'auth');
    return (
      !isEmpty(account) &&
      isLoaded(account) &&
      get(account, 'role.admin', false)
    );
  },
  // predicate: auth => get(auth, `user.role.${permission}`, false),
  authenticatingSelector: ({ firebase }) =>
      (pathToJS(firebase, 'auth') === undefined)
      || (pathToJS(firebase, 'profile') === undefined)
      || (pathToJS(firebase, 'isInitializing') === true),
  // AuthenticatingComponent: LoadingSpinner,
  wrapperDisplayName: 'UserIsAdmin',
  redirectPath: '/not-authorized',
  allowRedirectBack: false
});

export default {
  userHasBeenSetup,
  userIsAuthenticated,
  userIsNotAuthenticated,
  userHasPermission,
  userIsAdmin
}
