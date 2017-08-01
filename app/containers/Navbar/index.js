import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxFirebase as rfConfig } from 'app/config';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import * as CONST from 'app/constants';

// Components
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import Avatar from 'react-toolbox/lib/avatar';
import Navigation from 'react-toolbox/lib/navigation';
import Logo from 'components/Logo/Logo'

import classes from './index.css';

@withRouter
@firebaseConnect()
@connect(
  ({ meetings, notification, firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile'),
    notification,
    meetings
  })
)
export default class Navbar extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired,
    notification: PropTypes.object,
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'CLOSE_NOTIFICATION' });
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  handleToggleLeftNavigation = () => {
    this.props.firebase
      .update(`${rfConfig.userProfile}/${this.props.auth.uid}`, {showLeftNavigation: !this.props.account.showLeftNavigation})
      .catch((err) => {
        console.error('Error', err)
        // TODO: Display error to user
      })
  }

  render () {
    const { account, history, notification, meetings, withNotification } = this.props;
    const accountExists = isLoaded(account) && !isEmpty(account);

    console.log('account', account);

    let numberOfUpcomingAppointments = meetings ? meetings.upcoming ? meetings.upcoming.length : 0 : 0;

    const ctaMenu = (
      <div className={classes.navCta}>
        <Link to='/signup' className={classes.join}>Join now</Link>
        <Link to='/login' className={classes.signin}>Sign In</Link>
      </div>
    )

    const rightMenu = accountExists ? (
      <div className={classes.rightNav}>
        <Link to='/video' className={classes.rightNavVideo}><i className="fa fa-video-camera" />{numberOfUpcomingAppointments > 0 ? <div className={classes.numberOfNotifications}>{numberOfUpcomingAppointments}</div> : ''}</Link>
        {/* <Link to='/chat' className={classes.rightNavChat}><i className="fa fa-comments" /></Link> */}
        <div className={classes.rightNavName}>Hello {account.firstName}!</div>
        <Avatar className={classes.rightNavAvatar} image='/images/User.png' cover />
        <IconMenu className={classes.rightNavMenu} icon={<i className="fa fa-chevron-down" />} position='topRight' menuRipple>
          <MenuItem
            caption='Profile'
            onClick={() => history.push(CONST.PROFILE_PATH)}
            disabled={!account.role['profile']}
          />
          <MenuItem
            caption='Settings'
            onClick={() => history.push(CONST.SETTINGS_PATH)}
            disabled={!account.role['settings']}
          />
          <MenuItem
            caption='Sign out'
            onClick={this.handleLogout}
          />
        </IconMenu>
      </div>
    ) : ctaMenu

    const mainMenu = !accountExists ? (
      <div className={classes.nav}>
        <Link to={CONST.ABOUT_PATH}>About</Link>
        <Link to={CONST.FEATURES_PATH}>Features</Link>
        <Link to={CONST.PRICING_PATH}>Pricing</Link>
      </div>
    ) : ''

    const toggle = accountExists ? (
      <div className={classes.toggle} onClick={() => {
        this.handleToggleLeftNavigation()
      }}></div>
    ) : ''

    return (
      <header className={`${classes.header} ${account ? account.showLeftNavigation ? classes.withLeftNav : '' : ''} ${withNotification ? classes.withNotification : ''}`}>
        <div className={classes.leftNav}>
          {toggle}
          <Link to={accountExists ? `${CONST.DASHBOARD_PATH}` : '/'} className={classes.logo}><Logo width="80" /></Link>
          {mainMenu}
        </div>

        {rightMenu}
      </header>
    )
  }
}
