import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import classes from './LeftNavigation.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { reduxFirebase as rfConfig } from 'config';
import { firebaseConnect, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { LIST_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH, ABOUT_PATH } from 'constants';


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
    this.props.firebase.logout()
    this.context.router.push('/')
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
    const { account, auth } = this.props;
    const accountExists = isLoaded(account) && !isEmpty(account);

    console.log('profile/account: ', account);

    if (accountExists){
      return (
        <div>
          <div className={`${classes.container} ${!account.showLeftNavigation ? classes.collapsed : ''}`}>
            <div className={classes.toggle} onClick={() => {
              this.handleToggleLeftNavigation()
            }}></div>
            <div className={classes.navItems}>
              <div className={classes.navItemsGroup}>
                <div>Link:</div>
                <h2 className={classes.navItemsGroupHeadline}>Dashboard</h2>
                <Link to='getting-started' className={classes.navItem}>Getting Started</Link>
                <Link to='account' className={classes.navItem}>Profile</Link>
                <Link to='dashboard' className={classes.navItem}>Settings</Link>
              </div>

              <div className={classes.navItemsGroup}>
                <h2 className={classes.navItemsGroupHeadline}>Chat</h2>
                <Link to='dashboard' className={classes.navItem}>Inbox</Link>
                <Link to='dashboard' className={classes.navItem}>Sent</Link>
              </div>

              <div className={classes.navItemsGroup}>
                <h2 className={classes.navItemsGroupHeadline}>Video</h2>
                <Link to='dashboard' className={classes.navItem}>Contacts</Link>
                <Link to='dashboard' className={classes.navItem}>Call log</Link>
              </div>

              <div className={classes.navItemsGroup}>
                <h2 className={classes.navItemsGroupHeadline}>Exercise Library</h2>
                <Link to='dashboard' className={classes.navItem}>Sport 1</Link>
                <Link to='dashboard' className={classes.navItem}>Sport 2</Link>
              </div>

              <div className={classes.navItemsGroup}>
                <h2 className={classes.navItemsGroupHeadline}>Schedule</h2>
                <Link to='dashboard' className={classes.navItem}>Calendar</Link>
                <Link to='dashboard' className={classes.navItem}>Alerts</Link>
              </div>

              <div className={classes.navItemsGroup}>
                <h2 className={classes.navItemsGroupHeadline}>Account Activity</h2>
                <Link to='dashboard' className={classes.navItem}>Login Time</Link>
                <Link to='dashboard' className={classes.navItem}>Payments</Link>
                <Link to='dashboard' className={classes.navItem}>Overview</Link>
              </div>

              <div className={classes.navItemsGroup}>
                <h2 className={classes.navItemsGroupHeadline}>My Athletes</h2>
                <Link to='dashboard' className={classes.navItem}>Profiles</Link>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return (<div></div>)
    }
  }
}
