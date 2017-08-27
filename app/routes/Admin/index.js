import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import { DASHBOARD_PATH } from 'app/constants';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import { AllMeetings } from 'containers/Meetings';
import classes from './index.css';

@withRouter
@userIsAuthenticated
// @userHasPermission('admin')
@firebaseConnect()
@connect( // Map redux state to props
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class Admin extends Component {
  render () {
    const { account, history } = this.props;

    if(!account) {
      return <LoadingSpinner />
    }

    const { firstName } = account;

    return (
      <div className={classes.container}>
        <div className={classes.welcome}>
          <h1>Admin area</h1>
          <h2>Welcome{firstName ? `, ${firstName}` : '!'}</h2>
        </div>
        <div className={classes.logs}>
          <div className={classes.logsInner}>
            <div className={classes.logsCompleted}>
              <AllMeetings
                filter="completed"
                limit={5}
                showAllUsers={true}
              />
            </div>
            <div className={classes.logsUpcoming}>
              <AllMeetings
                limit={5}
                showAllUsers={true}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
