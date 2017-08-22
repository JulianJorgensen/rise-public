import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { isMentor} from 'utils/utils';

import 'assets/icons/regular/angle-double-right.svg';
import classes from './index.css';

@withRouter
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class GettingStartedNav extends Component {
  render() {
    let { location, account } = this.props;
    let { applicationApproved } = account;
    console.log(location);
    return (
      <div>
        <Link
          className={`${classes.headline} ${classes.active}`}
          to='/getting-started'
        >
          <div className={classes.navAnchor}>Getting Started</div>
        </Link>
        <div className={`${classes.content} ${classes.active}`}>
          <Link
            to='/getting-started/application'
            className={`${classes.navItem} ${location.pathname === '/getting-started/application' ? classes.navItemActive : ''}`}>
            <div className={classes.navAnchor}>Application</div>
          </Link>
        </div>

        { applicationApproved ?
          <div className={`${classes.content} ${classes.active}`}>
            { !isMentor(account.role) ?
              <Link
                to='/getting-started/agreements'
                className={`${classes.navItem} ${!applicationApproved ? classes.disabled : ''} ${location.pathname === '/getting-started/agreements' ? classes.navItemActive : ''}`}>
                <div className={classes.navAnchor}>Agreements</div>
              </Link>
            : '' }
            <Link
              to='/getting-started/payment'
              className={`${classes.navItem} ${!applicationApproved ? classes.disabled : ''} ${location.pathname === '/getting-started/payment' ? classes.navItemActive : ''}`}>
              <div className={classes.navAnchor}>Setup Payment</div>
            </Link>
          </div>
        : ''}
      </div>
    )
  }
}
