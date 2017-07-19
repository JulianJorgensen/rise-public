import React, { Component, PropTypes } from 'react';
import { get } from 'lodash';
import classes from './index.css';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { DASHBOARD_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH, ABOUT_PATH } from 'app/constants';
import NavAccordion from './components/NavAccordion';
import navItems from './components/navItems'

@withRouter
@userIsAuthenticated
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class LefNavigation extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  render () {
    const { account, activePath } = this.props;
    const accountExists = isLoaded(account) && !isEmpty(account);

    let renderNavItems = () => {
      return navItems.filter((navGroup) => {
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

    if (accountExists) {
      return (
        <div className={`${classes.container} ${!account.showLeftNavigation ? classes.collapsed : ''}`}>
          <NavAccordion
            activePath={activePath}
            className={classes.navItems}
          >
            {renderNavItems()}
          </NavAccordion>
        </div>
      )
    }else{
      return (<div></div>)
    }
  }
}
