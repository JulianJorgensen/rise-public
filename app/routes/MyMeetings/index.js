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

    console.log('account from mhymeeting', account);
    if(!account) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <Meetings />
      </div>
    )
  }
}
