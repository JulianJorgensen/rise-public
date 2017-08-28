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
import Logo from 'components/Logo/Logo';

// icons
import CalendarIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/calendar.svg';
import BarsIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/bars.svg';
import ChevronDownIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/chevron-down.svg';

// classes
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

    let numberOfUpcomingAppointments = meetings ? meetings.upcoming ? meetings.upcoming.length : 0 : 0;

    const ctaMenu = (
      <div className={classes.navCta}>
        <Link to='/signup' className={classes.join}>Join now</Link>
        <Link to='/login' className={classes.signin}>Sign In</Link>
      </div>
    )

    const rightMenu = accountExists ? (
      <div className={classes.rightNav}>
        <Link to='/meetings' className={classes.rightNavMeetings}>
          <CalendarIcon className={classes.meetingsIcon} />
          {numberOfUpcomingAppointments > 0 ? <div className={classes.numberOfNotifications}>{numberOfUpcomingAppointments}</div> : ''}
        </Link>
        <div className={classes.rightNavName}>{account.firstName ? `Hey ${account.firstName}!` : ''}</div>
        <Avatar className={classes.rightNavAvatar} image='/images/User.png' cover />
        <IconMenu className={classes.rightNavMenu} icon={<div className={classes.icon}><ChevronDownIcon className={classes.rightNavIcon} /></div>} position='topRight' menuRipple>
          <MenuItem
            caption='Profile'
            onClick={() => history.push('/dashboard/profile')}
            disabled={!account.role['profile']}
          />
          <MenuItem
            caption='Settings'
            onClick={() => history.push('/dashboard/settings')}
            disabled={!account.role['settings']}
          />
          <MenuItem
            caption='Sign out'
            onClick={() => history.push('/logout')}
          />
        </IconMenu>
      </div>
    ) : ctaMenu

    const toggle = accountExists ? (
      <div className={classes.toggle} onClick={() => {
        this.handleToggleLeftNavigation()
      }}><BarsIcon className={classes.icon} /></div>
    ) : ''

    return (
      <header className={`${classes.header} ${account ? account.showLeftNavigation ? classes.withLeftNav : '' : ''} ${withNotification ? classes.withNotification : ''}`}>
        <div className={classes.leftNav}>
          {toggle}
          <Link to={accountExists ? `${CONST.DASHBOARD_PATH}` : '/'} className={classes.logo}><Logo width="80" /></Link>
        </div>

        {rightMenu}
      </header>
    )
  }
}
