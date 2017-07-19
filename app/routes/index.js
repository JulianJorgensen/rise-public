import React, { Component, PropTypes } from 'react';
import {BrowserRouter as Router, Route, HashRouter, Link, withRouter} from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import Main from './index';
import LeftNavigation from '../containers/LeftNavigation';
import Navbar from '../containers/Navbar';

import Home from './Home';
import About from './About';
import Features from './Features';
import Pricing from './Pricing';
import Settings from './Settings';
import Schedule from './Schedule';
import MyAthletes from './MyAthletes';
import Video from './Video';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Profile from './Profile';
import GettingStarted from './GettingStarted';
import Recover from './Recover';
import NotAuthorized from './NotAuthorized';

import { Layout } from 'react-toolbox/lib/layout';
import ReactGA from 'react-ga';
// ReactGA.initialize('UA-6241825-9'); // initialize Google Analytics

import classes from './index.css'

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
export default class Index extends React.Component {
  constructor() {
    super();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    // log page view to Google Analytics
    // logPageView(location);

    // scroll to top when changing page
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className={classes.container}>
        {/* <div className={classes.notification}>You have an upcoming appointment.</div> */}
        <div className={classes.content}>
          <DocumentMeta {...meta} />
          <LeftNavigation />
          <div className={classes.mainContent}>
            <Navbar />
            <Layout className={classes.layout}>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/features" component={Features} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/getting-started" component={GettingStarted} />
              <Route path="/settings" component={Settings} />
              <Route path="/profile" component={Profile} />
              <Route path="/schedule" component={Schedule} />
            </Layout>
          </div>
          {ENV_CONFIG.ENV !== 'production' ? <div className={classes.environment}>{ENV_CONFIG.ENV}</div> : ''}
        </div>
      </div>
    )
  }
}
