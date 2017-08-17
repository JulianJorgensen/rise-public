import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';

import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@userIsAuthenticated // redirect to /login if user is not authenticated
@userHasPermission('getting-started')
@firebaseConnect() // add this.props.firebase
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class GettingStarted extends Component {
  state = {
  }

  render () {
    const { account } = this.props;

    if (!isLoaded(account)) {
      return <LoadingSpinner />
    }

    return(
      <div className={classes.container}>
        <h2>Hello! Welcome to RISE.</h2>
        <p>You’re about to fill out an application that will be sent for acceptance into RISE Athletes. We want to learn a bit about you, and once you fill out this information, you’ll be paired with a mentor that best fits you! Ready to get started??</p>
        <Button
          label='Fill out the application'
          primary
          href='/getting-started/application'
        />
      </div>
    )
  }
}
