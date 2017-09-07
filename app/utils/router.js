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

export const userIsAuthenticated = connectedRouterRedirect({
  authenticatingSelector: ({ firebase }) => {
    let status = pathToJS(firebase, 'auth') === undefined;
    // console.log('\n\n===userIsAuthenticated');
    // console.log('authenticatingSelector', status);
    // console.log('auth', pathToJS(firebase, 'auth'));
    // console.log('profile', pathToJS(firebase, 'profile'));
    return status;
  },
  AuthenticatingComponent: LoadingSpinner,
  authenticatedSelector: ({ firebase }) => {
    let status = pathToJS(firebase, 'auth') !== null && pathToJS(firebase, 'auth') !== undefined;
    // console.log('\nauthenticatedSelector', status);
    // console.log('auth', pathToJS(firebase, 'auth'));
    // console.log('profile', pathToJS(firebase, 'profile'));
    return status;
  },
  redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/login',
  allowRedirectBack: true,
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
 export const userIsNotPending = connectedRouterRedirect({
   wrapperDisplayName: 'UserIsNotPending',
   allowRedirectBack: false,
   authenticatedSelector: ({ firebase }) => {
     let account = pathToJS(firebase, 'profile');
     console.log('account from userisnotpending', account);
     let status = account !== undefined && account !== null && account.hasConfirmedAgreements && account.hasSetupPayment;
    //  console.log('\nauthenticatedSelector', status);
    //  console.log('auth', pathToJS(firebase, 'auth'));
     return status;
   },
   authenticatingSelector: ({ firebase }) => {
     let isFirebaseInitializing = pathToJS(firebase, 'profile') === undefined || pathToJS(firebase, 'profile') === null;
    console.log('authenticating: ', pathToJS(firebase, 'profile'));
    //  console.log('\n\n===userIsNotAuthenticated')
    //  console.log('firebase auth', pathToJS(firebase, 'auth'));
    //  console.log('authenticatingSelector', isFirebaseInitializing);
     return isFirebaseInitializing;
   },
   redirectPath: ({ firebase }, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/getting-started'
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
   wrapperDisplayName: 'UserIsNotAuthenticated',
   allowRedirectBack: false,
   authenticatedSelector: ({ firebase }) => {
     let status = pathToJS(firebase, 'auth') === null;
    //  console.log('\nauthenticatedSelector', status);
    //  console.log('auth', pathToJS(firebase, 'auth'));
     return status;
   },
   authenticatingSelector: ({ firebase }) => {
     let isFirebaseInitializing = pathToJS(firebase, 'auth') === undefined;
    //  console.log('\n\n===userIsNotAuthenticated')
    //  console.log('firebase auth', pathToJS(firebase, 'auth'));
    //  console.log('authenticatingSelector', isFirebaseInitializing);
     return isFirebaseInitializing;
   },
   redirectPath: ({ firebase }, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/dashboard'
 })

/**
 * @description Higher Order Component that redirects to the homepage if
 * the user does not have the required permission. This HOC requires that the user
 * profile be loaded and the role property populated
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */

// export const userHasPermission = permission => connectedRouterRedirect({
//   authenticatedSelector: ({ firebase }) => {
//     const account = pathToJS(firebase, 'profile');
//     const auth = pathToJS(firebase, 'auth');
//     return (!isEmpty(account) && isLoaded(account) && get(account, `role.${permission}`, false));
//   },
//   // predicate: auth => get(auth, `user.role.${permission}`, false),
//   authenticatingSelector: ({ firebase }) =>
//       (pathToJS(firebase, 'auth') === undefined)
//       || (pathToJS(firebase, 'profile') === undefined)
//       || (pathToJS(firebase, 'isInitializing') === true),
//   // AuthenticatingComponent: LoadingSpinner,
//   wrapperDisplayName: 'UserHasPermission',
//   redirectPath: '/not-authorized',
//   allowRedirectBack: false
// });


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
  userIsNotPending,
  userIsAuthenticated,
  userIsNotAuthenticated,
  // userHasPermission,
  userIsAdmin
}
