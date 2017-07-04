import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import classes from './LeftNavigation.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { firebaseConnect, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { DASHBOARD_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH, ABOUT_PATH, leftNav } from 'constants';


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
      return leftNav.map((navGroup, index) => {
        if (!navGroup.showOnlyFor || navGroup.showOnlyFor === account.role.name) {
          return (
            <div key={index} className={classes.navItemsGroup}>
              <Link to={`/${navGroup.url}`}><h2 className={`${classes.navItemsGroupHeadline} ${account.role[navGroup.url] ? '' : classes.disabled}`}>{navGroup.icon ? <i className={`fa ${navGroup.icon}`} /> : ''} {navGroup.anchor}</h2></Link>
              {navGroup.children.map((navItem, navItemIndex) => {
                return (
                  <Link key={navItemIndex} to={`/${navItem.url}`} className={`${classes.navItem} ${account.role[navItem.url] ? '' : classes.disabled}`}>{navItem.anchor}</Link>
                )
              })}
            </div>
          )
        }
      });
    }

    if (accountExists){
      return (
        <div>
          <div className={`${classes.container} ${!account.showLeftNavigation ? classes.collapsed : ''}`}>
            <div className={classes.navItems}>
              {renderNavItems()}
            </div>
          </div>
        </div>
      )
    }else{
      return (<div></div>)
    }
  }
}
