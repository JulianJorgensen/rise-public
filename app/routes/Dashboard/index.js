import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import { DASHBOARD_PATH } from 'app/constants';
import { userIsAuthenticated, userHasPermission, userIsNotPending } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import Meetings from 'containers/Meetings';
import classes from './index.css';

import MeetingIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/phone.svg';
import SettingsIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/cogs.svg';
import ProfileIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/address-card.svg';

@withRouter
@userIsAuthenticated
@firebaseConnect()
@connect( // Map redux state to props
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
@userIsNotPending
export default class Dashboard extends Component {
  render () {
    const { account, history } = this.props;

    if(!account) {
      return <LoadingSpinner />
    }

    const { firstName, timezone, mentor } = account;

    return (
      <div className={classes.container}>
        <div className={classes.welcome}>
          <h1>Welcome{firstName ? ` back, ${firstName}` : '!'}</h1>
        </div>
        <div className={classes.logs}>
          <div className={classes.logsInner}>
            <div className={classes.logsCompleted}>
              <Meetings filter="completed" />
            </div>
            <div className={classes.logsUpcoming}>
              <Meetings />
            </div>
          </div>
        </div>
        <div className={classes.actionsContainer}>
          <h2>Would you like to</h2>
          <div className={classes.actions}>
            <div
              className={classes.action}
              onClick={() => history.push('/schedule')}
            >
              <MeetingIcon className={classes.icon} />
              Schedule Your Next Call
            </div>
            <div
              className={classes.action}
              onClick={() => history.push('/dashboard/settings')}
            >
              <SettingsIcon className={classes.icon} />
              Settings
            </div>
            <div
              className={classes.action}
              onClick={() => history.push('/dashboard/profile')}
            >
              <ProfileIcon className={classes.icon} />
              Profile
            </div>
          </div>
        </div>
      </div>
    )
  }
}
