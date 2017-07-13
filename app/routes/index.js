import React from 'react';
import {BrowserRouter as Router, Route, HashRouter, Link} from 'react-router-dom';
import DocumentMeta from 'react-document-meta';
import Main from './index';
import LeftNavigation from '../containers/LeftNavigation';
import Navbar from '../containers/Navbar';

import Home from './Home';
import AboutRoute from './About';
import FeaturesRoute from './Features';
import PricingRoute from './Pricing';
import SettingsRoute from './Settings';
import ScheduleRoute from './Schedule';
import MyAthletesRoute from './MyAthletes';
import VideoRoute from './Video';
import LoginRoute from './Login';
import SignupRoute from './Signup';
import DashboardRoute from './Dashboard';
import ProfileRoute from './Profile';
import GettingStartedRoute from './GettingStarted';
import RecoverRoute from './Recover';
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
    <div id="main">
      <DocumentMeta {...meta} />
      <LeftNavigation />
      <div className={classes.mainContent}>
        <Navbar />
        <Route path="/" component={Main} />
        <Layout className={classes.layout}>
          <Route exact path="/" component={Home} />
        </Layout>
      </div>
    </div>
  </Router>
);
