import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import classes from './LeftNavigation.css';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { firebaseConnect, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { DASHBOARD_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH, ABOUT_PATH, leftNav } from 'constants';
import Accordion from 'components/Accordion';

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
      return leftNav
        .filter((navGroup) => {
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
