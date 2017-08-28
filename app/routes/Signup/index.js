import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import {Tab, Tabs} from 'react-toolbox/lib/tabs';
import { LOGIN_PATH } from 'app/constants';
import { userIsNotAuthenticated } from 'utils/router';
import AthleteSignupForm from './components/AthleteSignupForm';
import MentorSignupForm from './components/MentorSignupForm';
import classes from './index.css';

import { Card } from 'react-toolbox/lib/card';

@withRouter
@userIsNotAuthenticated
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class Signup extends Component {
  state = {
    roleIndex: 0,
    role: 'athlete-pending'
  }

  handleSignup = ({ email, password }) => {
    const { firebase, history, authError, dispatch } = this.props;
    const { createUser, update } = firebase;

    createUser({ email, password })
      .then((newUser) => {
        let { uid } = this.props.auth;
        update(`${rfConfig.userProfile}/${uid}`, {
          uid: uid,
          role: this.state.role
        });
        history.push('/getting-started');
      }).catch((error) => {
        dispatch({
          type: 'SET_SNACKBAR',
          message: error.message || 'There was an error creating your user.',
          style: 'error'
        });
        return false;
      });
  }

  handleRoleChange = (index) => {
    this.setState({
      roleIndex: index,
      role: index == 0 ? 'athlete-pending' : 'mentor-pending'
    });
  };

  providerLogin = (provider) => {
    const { firebase, history } = this.props;
    const { update } = firebase;

    this.props.firebase.login({
      provider: provider,
      type: 'popup'
    }).then((providerCreds) => {
      let { uid } = providerCreds.user;
      update(`${rfConfig.userProfile}/${uid}`, {
        uid: uid,
        role: this.state.role
      });
      history.push('/getting-started');
    });
  }

  render () {
    const { authError } = this.props

    return (
      <div className={classes.wrapper}>
        <h2>Join Now</h2>
        <Tabs theme={classes} index={this.state.roleIndex} onChange={this.handleRoleChange} inverse>
          <Tab label='Athlete'>
            <AthleteSignupForm onSubmit={this.handleSignup} />
          </Tab>
          <Tab label='Mentor'>
            <MentorSignupForm onSubmit={this.handleSignup} />
          </Tab>
        </Tabs>
        <div className={classes.or}>
          or
        </div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.login}>
          <span className={classes.loginLabel}>
            Already have an account?
          </span>
          <Link className={classes.loginLink} to={LOGIN_PATH}>
            Login
          </Link>
        </div>
      </div>
    )
  }
}
