import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import moment from 'moment-timezone';
import { DASHBOARD_PATH } from 'app/constants';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import UpcomingAppointments from 'containers/UpcomingAppointments';
import classes from './index.css';

const ACUITY_MENTOR_CALL_ID = 346940;

@userIsAuthenticated
@userHasPermission('dashboard')
@firebaseConnect()
@connect( // Map redux state to props
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class Dashboard extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  componentWillMount() {
    console.log('mounting dashboard...');
  }

  render () {
    const { account } = this.props;
    const { firstName, timezone, mentor } = account;

    return (
      <div className={classes.container}>
        <div className={classes.welcome}>
          <h1>Welcome{firstName ? ` back, ${firstName}` : '!'}</h1>
        </div>
        <div className={classes.actionsContainer}>
          <h2>would you like to</h2>
          <div className={classes.actions}>
            <div className={classes.action}>
              <i className="fa fa-calendar" />
            </div>
            <div className={classes.action}>
              <i className="fa fa-calendar" />
            </div>
            <div className={classes.action}>
              <i className="fa fa-calendar" />
            </div>
          </div>
        </div>
        <div className={classes.logs}>
          <div className={classes.logsInner}>
            <div className={classes.logsCompleted}>
              <h3>Recently Completed</h3>
            </div>
            <div className={classes.logsUpcoming}>
              <h3>Upcoming Calls</h3>
              <UpcomingAppointments />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
