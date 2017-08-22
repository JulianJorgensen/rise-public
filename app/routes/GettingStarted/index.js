import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated } from 'utils/router';
import { isMentor, isAdmin } from 'utils/utils';

import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@userIsAuthenticated
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class GettingStarted extends Component {
  render () {
    const { account } = this.props;

    return(
      <div className={classes.container}>
        <h2>Hello! Welcome to RISE.</h2>

        <Button
          label='Fill out the application'
          primary
          href='/getting-started/application'
        />
      </div>
    )
  }
}
