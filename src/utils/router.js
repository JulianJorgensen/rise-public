import React from 'react';
import { get } from 'lodash';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { browserHistory } from 'react-router';
import { LIST_PATH, NOT_AUTHORIZED_PATH } from 'constants';
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
export const UserIsAuthenticated = UserAuthWrapper({ // eslint-disable-line new-cap
  wrapperDisplayName: 'UserIsAuthenticated',
  LoadingComponent: LoadingSpinner,
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    (pathToJS(firebase, 'auth') === undefined) ||
    (pathToJS(firebase, 'isInitializing') === true),
  predicate: auth => auth !== null,
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc)
    dispatch({
      type: UNAUTHED_REDIRECT,
      payload: { message: 'User is not authenticated.' }
    })
  }
})

/**
 * @description Higher Order Component that redirects to listings page or most
 * recent route instead rendering if user is not authenticated. This is useful
 * routes that should not be displayed if a user is logged in, such as the
 * login route.
 * @param {Component} componentToWrap - Component to wrap
 * @return {Component} wrappedComponent
 */
export const UserIsNotAuthenticated = UserAuthWrapper({ // eslint-disable-line new-cap
  wrapperDisplayName: 'UserIsNotAuthenticated',
  allowRedirectBack: false,
  LoadingComponent: LoadingSpinner,
  failureRedirectPath: (state, props) =>
    // redirect to page user was on or to list path
    props.location.query.redirect || LIST_PATH,
  authSelector: ({ firebase }) => pathToJS(firebase, 'auth'),
  authenticatingSelector: ({ firebase }) =>
    (pathToJS(firebase, 'auth') === undefined) ||
    (pathToJS(firebase, 'isInitializing') === true),
  predicate: auth => auth === null,
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc)
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
export const UserHasPermission = permission => UserAuthWrapper({ // eslint-disable-line new-cap
  authSelector: ({ firebase }) => {
    const user = pathToJS(firebase, 'profile');
    if (user) {
      return { ...pathToJS(firebase, 'auth'), user }; // attach profile for use in predicate
    }
    return pathToJS(firebase, 'auth');
  },
  authenticatingSelector: ({ firebase }) =>
      (pathToJS(firebase, 'auth') === undefined)
      || (pathToJS(firebase, 'profile') === undefined)
      || (pathToJS(firebase, 'isInitializing') === true),
  redirectAction: newLoc => (dispatch) => {
    browserHistory.replace(newLoc);
    dispatch({ type: UNAUTHED_REDIRECT });
  },
  failureRedirectPath: `${NOT_AUTHORIZED_PATH}`,
  wrapperDisplayName: 'UserHasPermission',
  predicate: auth => get(auth, `user.role.${permission}`, false),
  allowRedirectBack: false,
  LoadingComponent: 'loading'
});


export default {
  UserIsAuthenticated,
  UserIsNotAuthenticated,
  UserHasPermission
}
