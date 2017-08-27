import React, { Component } from 'react';
import { get } from 'lodash';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { DASHBOARD_PATH, ACCOUNT_PATH, LOGIN_PATH, SIGNUP_PATH, ABOUT_PATH } from 'app/constants';
import NavAccordion from './components/NavAccordion';
import navItems from './components/NavItems/index';
import GettingStarted from './components/GettingStarted';
import classes from './index.css';

@withRouter
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class LefNavigation extends Component {
  render () {
    let { account, accountRaw, location, activePath } = this.props;
    let accountExists = isLoaded(account) && !isEmpty(account);
    let primaryRoute;
    let navGroupDisabled;
    let navItemRoute;
    let navItemDisabled;
    let showForUser;

    let renderNavItems = () => {
      return navItems.filter((navGroup) => {
        if (!navGroup.showOnlyFor){
          return true;
        }
        showForUser = navGroup.showOnlyFor.includes(account.role.name) || navGroup.showOnlyFor.includes(`${account.role.name}-pending`);
        return showForUser;
      })
        .map((navGroup, index) => {
          navGroupDisabled = account.role[navGroup.url.substring(1)] ? false : true;
          return (
            <div
              key={index}
              className={classes.navItemsGroup}
            >
              <div
                className={`
                  ${classes.navItemsGroupHeadline}
                  ${navGroupDisabled ? classes.disabled : ''}
                `}
                classNameActive={classes.active}
                href={navGroup.url && !navGroupDisabled ? navGroup.url : null}
              >
                <div className={`${classes.navAnchor} ${navGroup.className}`}>{navGroup.anchor}</div>
              </div>
              <div
                className={classes.navItemsGroupContent}
                classNameActive={classes.active}
              >
                {navGroup.children ? navGroup.children.map((navItem, navItemIndex) => {
                  primaryRoute = navItem.url.split('/')[1];
                  navItemRoute = navItem.url.split('/')[2];
                  navItemDisabled = (navItem.disabledForPendingApplicants && !account.applicationApproved) ? true : false;

                  if(navItemDisabled){
                    return (
                      <div key={navItemIndex} className={`${classes.navItem} ${classes.disabled}`}>
                        <div className={classes.navAnchor}>{navItem.anchor}</div>
                      </div>
                    )
                  }

                  return (
                    <Link
                      key={navItemIndex}
                      to={navItem.url}
                      className={`${classes.navItem} ${navItem.url === location.pathname ? classes.navItemActive : ''}`}>
                      <div className={classes.navAnchor}>{navItem.anchor}</div>
                    </Link>
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
          { account.role['getting-started'] ?  <GettingStarted /> : '' }

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
