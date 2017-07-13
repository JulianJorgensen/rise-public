import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import classes from './index.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { firebaseConnect, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { DASHBOARD_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH, ABOUT_PATH } from 'constants';
import Accordion from 'components/Accordion';

const leftNav = [
  {
    url: 'dashboard',
    anchor: 'Dashboard',
    icon: 'fa-home',
    children: [
      {
        url: 'getting-started',
        anchor: 'Getting started'
      },
      {
        url: 'profile',
        anchor: 'Profile'
      },
      {
        url: 'settings',
        anchor: 'Settings'
      }
    ]
  },
  {
    url: 'chat',
    anchor: 'Chat',
    icon: 'fa-comments',
    children: [
      {
        url: 'inbox',
        anchor: 'Inbox',
        disabled: true
      },
      {
        url: 'sent',
        anchor: 'Sent',
        disabled: true
      }
    ]
  },
  {
    url: 'video',
    anchor: 'Video',
    icon: 'fa-video-camera',
    children: [
      {
        url: 'log',
        anchor: 'Call log'
      },
      {
        url: 'contacts',
        anchor: 'Contacts',
        disabled: true
      }
    ]
  },
  {
    url: 'library',
    anchor: 'Exercise Library',
    icon: 'fa-files-o',
    children: [
      {
        url: 'sport-1',
        anchor: 'Sport 1',
        disabled: true
      },
      {
        url: 'sport-2',
        anchor: 'Sport 2',
        disabled: true
      }
    ]
  },
  {
    url: 'schedule',
    anchor: 'Schedule',
    icon: 'fa-calendar'
  },
  {
    url: 'activity',
    anchor: 'Account Activity',
    icon: 'fa-tasks',
    children: [
      {
        url: 'login-time',
        anchor: 'Login Time',
        disabled: true
      },
      {
        url: 'payments',
        anchor: 'Payments',
        disabled: true
      },
      {
        url: 'overview',
        anchor: 'Overview',
        disabled: true
      }
    ]
  },
  {
    url: 'my-athletes',
    anchor: 'My Athletes',
    icon: 'fa-users',
    showOnlyFor: 'mentor',
    children: [
      {
        url: 'profiles',
        anchor: 'Profiles',
        disabled: true
      }
    ]
  }
];

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class LefNavigation extends Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  render () {
    const { account, auth } = this.props;
    const accountExists = isLoaded(account) && !isEmpty(account);

    let renderNavItems = () => {
      return leftNav.filter((navGroup) => {
          return (!navGroup.showOnlyFor || navGroup.showOnlyFor === account.role.name)
        })
        .map((navGroup, index) => {
          return (
            <div
              key={index}
              className={classes.navItemsGroup}
            >
              <div
                className={`${classes.navItemsGroupHeadline} ${account.role[navGroup.url] ? '' : classes.disabled}`}
                classNameActive={classes.active}
                href={navGroup.url ? navGroup.url : null}
              >
                {navGroup.icon ? <i className={`fa ${navGroup.icon}`} /> : ''} {navGroup.anchor}
              </div>
              <div
                className={classes.navItemsGroupContent}
                classNameActive={classes.active}
              >
                {navGroup.children ? navGroup.children.map((navItem, navItemIndex) => {
                  return (
                    <Link key={navItemIndex} to={`/${navItem.url}`} className={`${classes.navItem} ${(!account.role[navItem.url] || navItem.disabled) ? classes.disabled : ''}`}>{navItem.anchor}</Link>
                  )
                }) : ''}
              </div>
            </div>
          )
      });
    }

    if (accountExists){
      return (
        <div className={`${classes.container} ${!account.showLeftNavigation ? classes.collapsed : ''}`}>
          <Accordion className={classes.navItems} selected={0}>
            {renderNavItems()}
          </Accordion>
        </div>
      )
    }else{
      return (<div></div>)
    }
  }
}
