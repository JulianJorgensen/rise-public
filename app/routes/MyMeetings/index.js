import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'

import Meetings from 'containers/Meetings';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@userIsAuthenticated
//@userHasPermission('meetings')
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class MyMeetings extends Component {
  render () {
    let { account } = this.props;

    if(!account) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <div>
          <h2>Access your call!</h2>
          <p>Step 1 : Click on the meeting link to access the Zoom video room for your call!</p>
          <p>Step 2 : Join the Zoom call to chat with your athlete/mentor!</p>
        </div>

        <Meetings />
      </div>
    )
  }
}
