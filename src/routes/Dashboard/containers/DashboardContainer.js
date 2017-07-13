import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import moment from 'moment-timezone';
import { DASHBOARD_PATH } from 'constants';
import { userIsAuthenticated, UserHasPermission } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import UpcomingAppointments from 'containers/UpcomingAppointments';
import classes from './DashboardContainer.css';

const ACUITY_MENTOR_CALL_ID = 346940;

@userIsAuthenticated // redirect to /login if user is not authenticated
// @userHasPermission('dashboard')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    account: populate(firebase, 'profile')
  })
)
export default class Dashboard extends Component {
  state = {
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    projects: PropTypes.object,
    firebase: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object
  }

  render () {
    const { projects, auth, account } = this.props;
    const { firstName, timezone, mentor } = account;

    // Project Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    if (account) {
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
    }else{
      return <LoadingSpinner />
    }
  }
}
