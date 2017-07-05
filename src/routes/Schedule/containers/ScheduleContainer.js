import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { UserIsAuthenticated, UserHasPermission } from 'utils/router'

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './ScheduleContainer.css';

@UserIsAuthenticated // redirect to /login if user is not authenticated
@UserHasPermission('schedule')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Schedule extends Component {
  render () {
    let {account} = this.props;
    console.log('account: ', account);
    return (
      <div className={classes.container}>
        Schedule a session with your mentor {account.mentor.firstName}, with acuity calendar id: {account.mentor.acuityCalendarId}
        <iframe src="https://app.acuityscheduling.com/schedule.php?owner=11454955&calendarID=161362" width="100%" height="800" frameBorder="0"></iframe>
        <script src="https://d3gxy7nm8y4yjr.cloudfront.net/js/embed.js" type="text/javascript"></script>
      </div>
    )
  }
}
