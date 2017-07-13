import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'

import UpcomingAppointments from 'containers/UpcomingAppointments';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './VideoContainer.css';

@userIsAuthenticated // redirect to /login if user is not authenticated
// @userHasPermission('video')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    account: populate(firebase, 'profile')
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
