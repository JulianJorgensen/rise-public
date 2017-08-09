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
    let { account, location, activePath } = this.props;
    let accountExists = isLoaded(account) && !isEmpty(account);
    let primaryRoute;

    let renderNavItems = () => {
      return navItems.filter((navGroup) => {
        if (navGroup.showOnlyFor) {
          return navGroup.showOnlyFor.includes(account.status === 'pending' ? `${account.role.name}-pending` : account.role.name);
        }else{
          return true;
        }
        })
        .map((navGroup, index) => {
          return (
            <div
              key={index}
              className={classes.navItemsGroup}
            >
              <div
                className={`
                  ${classes.navItemsGroupHeadline}
                  ${account.role[navGroup.url.substring(1)] ? '' : classes.disabled}
                  ${navGroup.className}
                `}
                classNameActive={classes.active}
                href={navGroup.url ? navGroup.url : null}
              >
                {navGroup.anchor}
              </div>
              <div
                className={classes.navItemsGroupContent}
                classNameActive={classes.active}
              >
                {navGroup.children ? navGroup.children.map((navItem, navItemIndex) => {
                  primaryRoute = navItem.url.split('/')[1];
                  return (
                    <Link
                      key={navItemIndex}
                      to={`${navItem.url}`}
                      className={`${classes.navItem} ${navItem.url === location.pathname ? classes.navItemActive : ''} ${(!account.role[primaryRoute] || navItem.disabled) ? classes.disabled : ''}`}>{navItem.anchor}</Link>
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
