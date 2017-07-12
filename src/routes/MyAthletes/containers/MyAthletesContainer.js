import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { UserIsAuthenticated, UserHasPermission } from 'utils/router'

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './MyAthletesContainer.css';

@UserIsAuthenticated // redirect to /login if user is not authenticated
@UserHasPermission('my-athletes')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class MyAthletes extends Component {
  constructor(){
    super();

    this.state = {
    }
  }

  render () {
    let { account } = this.props;

    console.log('account: ', account);

    return (
      <div className={classes.container}>
      </div>
    )
  }
}
