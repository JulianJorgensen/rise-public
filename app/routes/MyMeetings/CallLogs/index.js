import React, { Component, cloneElement, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import Meetings from 'containers/Meetings';
import classes from './index.css';

@withRouter
@userIsAuthenticated
@userHasPermission('logs')
@firebaseConnect()
@connect( // Map redux state to props
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class CallLogs extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  render () {
    const { account, history } = this.props;

    return (
      <div className={classes.container}>
        <h2>Call Logs</h2>
        <div className={classes.logs}>
          <div className={classes.logsInner}>
            <div className={classes.logsCompleted}>
              <Meetings filter="completed" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
