import React, { Component, PropTypes } from 'react';
import {BrowserRouter as Router, Route, HashRouter, Link, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import DocumentMeta from 'react-document-meta';
import { userIsAuthenticated, userIsNotAuthenticated } from 'utils/router';

import TopNotification from 'components/TopNotification';
import Snackbar from 'components/Snackbar';
import LeftNavigation from 'containers/LeftNavigation';
import Navbar from '../containers/Navbar';

import Home from './Home';
import About from './About';
import Features from './Features';
import Pricing from './Pricing';
import Settings from './Dashboard/Settings';
import Schedule from './Schedule';
import MyAthletes from './MyAthletes';
import MyMeetings from './MyMeetings';
import CallLogs from './MyMeetings/CallLogs';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Profile from './Dashboard/Profile';
import GettingStarted from './GettingStarted';
import Application from './GettingStarted/Application';
import Agreements from './GettingStarted/Agreements';
import Payment from './GettingStarted/Payment';

import Admin from './Admin';
import AdminUsers from './Admin/Users';
import AdminCallLogs from './Admin/CallLogs';

import Recover from './Recover';
import NotAuthorized from './NotAuthorized';
import NotFound from './NotFound';



import { Layout } from 'react-toolbox/lib/layout';
import ReactGA from 'react-ga';
// ReactGA.initialize('UA-6241825-9'); // initialize Google Analytics

import classes from './index.css';

// site meta data
const meta = {
  title: 'RISE Athletes',
  description: 'Some meta description here..',
  meta: {
    charset: 'utf-8'
  },
  auto: {
    ograph: true
  }
};

@withRouter
@firebaseConnect()
@connect(
  ({ notification, meetings }) => ({
    notification,
    meetings
  })
)
export default class Index extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  handleLogout = () => {
    this.props.dispatch({ type: 'CLOSE_NOTIFICATION' });
    this.props.firebase.logout();
    this.props.history.push('/');
    return null;
  }

  onRouteChanged() {
    // log page view to Google Analytics
    // logPageView(location);

    // scroll to top when changing page
    window.scrollTo(0, 0);
  }

  render() {
    let { notification } = this.props;

    return (
      <div className={classes.container}>
        <TopNotification />
        <Snackbar />
        <div className={`${classes.content} ${notification ? notification.show ? classes.withNotification : '' : ''}`}>
          <DocumentMeta {...meta} />
          <LeftNavigation />
          <div className={classes.mainContent}>
            <Navbar withNotification={notification ? notification.show ? true : false : false} />
            <Layout className={classes.layout}>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/features" component={Features} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgot" component={Recover} />
              <Route exact path="/getting-started" component={GettingStarted} />
              <Route path="/getting-started/application" component={Application} />
              <Route path="/getting-started/agreements" component={Agreements} />
              <Route path="/getting-started/payment" component={Payment} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/dashboard/settings" component={Settings} />
              <Route path="/dashboard/profile" component={Profile} />
              <Route path="/schedule" component={Schedule} />
              <Route exact path="/meetings" component={MyMeetings} />
              <Route path="/video/logs" component={CallLogs} />
              <Route path="/my-athletes" component={MyAthletes} />
              <Route exact path="/admin" component={Admin} />
              <Route path="/admin/users" component={AdminUsers} />
              <Route path="/admin/call-logs" component={AdminCallLogs} />
              <Route path="/logout" render={this.handleLogout} />
              <Route path="/not-authorized" component={NotAuthorized} />
              <Route path="/not-found" component={NotFound} />
            </Layout>
          </div>
          {ENV_CONFIG.ENV !== 'production' ? <div className={classes.environment}>{ENV_CONFIG.ENV}</div> : ''}
        </div>
      </div>
    )
  }
}
