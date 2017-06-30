import React, { Component, PropTypes } from 'react'
import classes from './Navbar.css'
import { Link } from 'react-router'
import { connect } from 'react-redux'
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

  render () {
    const { account } = this.props;
    const accountExists = isLoaded(account) && !isEmpty(account);

    const mainMenu = (
      <div className={classes.navCta}>
        <Link to={SIGNUP_PATH} className={classes.join}>Join now</Link>
        <Link to={LOGIN_PATH} className={classes.signin}>Sign In</Link>
      </div>
    )

    const rightMenu = accountExists ? (
      <div className={classes.rightNav}>
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
    ) : mainMenu

    return (
      <header className={`${classes.header} ${account ? account.showLeftNavigation ? classes.withLeftNav : '' : ''}`}>
        <Link to={accountExists ? `${DASHBOARD_PATH}` : '/'} className={classes.logo}><Logo width="80" /></Link>

        <div className={classes.nav}>
          <Link to={ABOUT_PATH}>About</Link>
          <Link to='/features'>Features</Link>
          <Link to='/pricing'>Pricing</Link>
        </div>

        {rightMenu}
      </header>
    )
  }
}
