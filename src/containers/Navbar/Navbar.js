import React, { Component, PropTypes } from 'react'
import classes from './Navbar.css'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { reduxFirebase as rfConfig } from 'config';
import { firebaseConnect, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase'
import { DASHBOARD_PATH, PROFILE_PATH, SETTINGS_PATH, LOGIN_PATH, SIGNUP_PATH, ABOUT_PATH } from 'constants'

// Components
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import Avatar from 'react-toolbox/lib/avatar';
import Navigation from 'react-toolbox/lib/navigation';
import Logo from 'components/Logo/Logo'

const buttonStyle = {
  color: 'white',
  textDecoration: 'none',
  alignSelf: 'center'
}

const avatarStyles = {
  wrapper: { marginTop: 0 },
  button: { marginRight: '.5rem', width: '200px', height: '64px' },
  buttonSm: { marginRight: '.5rem', width: '30px', height: '64px', padding: '0' }
}

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Navbar extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  handleLogout = () => {
    this.props.firebase.logout();
    this.context.router.push('/');
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
    const { account, withNotification } = this.props;
    const accountExists = isLoaded(account) && !isEmpty(account);

    // this.props.firebase.logout();

    const ctaMenu = (
      <div className={classes.navCta}>
        <Link to={SIGNUP_PATH} className={classes.join}>Join now</Link>
        <Link to={LOGIN_PATH} className={classes.signin}>Sign In</Link>
      </div>
    )

    const rightMenu = accountExists ? (
      <div className={classes.rightNav}>
        <Link to='/video' className={classes.rightNavVideo}><i className="fa fa-video-camera" /></Link>
        <Link to='/chat' className={classes.rightNavChat}><i className="fa fa-comments" /></Link>
        <div className={classes.rightNavName}>Hello {account.firstName}!</div>
        <Avatar className={classes.rightNavAvatar} image='/images/User.png' cover />
        <IconMenu className={classes.rightNavMenu} icon={<i className="fa fa-chevron-down" />} position='topRight' menuRipple>
          <MenuItem
            caption='Profile'
            onTouchTap={() => this.context.router.push(PROFILE_PATH)}
          />
          <MenuItem
            caption='Settings'
            onTouchTap={() => this.context.router.push(SETTINGS_PATH)}
            disabled={account.status === 'pending'}
          />
          <MenuItem
            caption='Sign out'
            onTouchTap={this.handleLogout}
          />
        </IconMenu>
      </div>
    ) : ctaMenu

    const mainMenu = !accountExists ? (
      <div className={classes.nav}>
        <Link to={ABOUT_PATH}>About</Link>
        <Link to='/features'>Features</Link>
        <Link to='/pricing'>Pricing</Link>
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
          <Link to={accountExists ? `${DASHBOARD_PATH}` : '/'} className={classes.logo}><Logo width="80" /></Link>
          {mainMenu}
        </div>

        {rightMenu}
      </header>
    )
  }
}
