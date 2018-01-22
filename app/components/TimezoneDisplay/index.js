import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import moment from 'moment-timezone';
import classes from './index.css';

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class TimezoneDisplay extends Component {
  render() {
    let { account } = this.props;
    return (
      <div className={classes.container}>
        <small>
          <p>All times are in {account.timezone} ({moment().tz(account.timezone).format('z Z')})</p>
          <p><Link to='/dashboard/settings'>Change your timezone in Settings.</Link></p>
        </small>
      </div>
    )
  }
};
