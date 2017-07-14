import React from 'react';
import {BrowserRouter as Router, Route, HashRouter, Link} from 'react-router-dom';
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

export default (
  <Router>
    <div className={classes.container}>
      <DocumentMeta {...meta} />
      <LeftNavigation />
      <div className={classes.mainContent}>
        <Navbar />
        <Route path="/" component={Main} />
        <Layout className={classes.layout}>
          <Route exact path="/" component={Home} />
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
  </Router>
);
