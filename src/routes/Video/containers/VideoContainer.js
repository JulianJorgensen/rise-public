import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { UserIsAuthenticated, UserHasPermission } from 'utils/router'

import UpcomingAppointments from 'containers/UpcomingAppointments';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './VideoContainer.css';

@UserIsAuthenticated // redirect to /login if user is not authenticated
@UserHasPermission('video')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Video extends Component {
  constructor(){
    super();

    this.state = {
    }
  }

  render () {
    return (
      <div className={classes.container}>
        <UpcomingAppointments />
      </div>
    )
  }
}
