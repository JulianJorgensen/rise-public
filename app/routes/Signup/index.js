import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { firebaseConnect, populate, isLoaded } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import Snackbar from 'components/Snackbar';
import {Tab, Tabs} from 'react-toolbox';
import moment from 'moment-timezone';
import { LOGIN_PATH } from 'app/constants';
import { userIsNotAuthenticated } from 'utils/router';
import AthleteSignupForm from './components/AthleteSignupForm';
import MentorSignupForm from './components/MentorSignupForm';
import classes from './index.css';

import { Card } from 'react-toolbox/lib/card';


@userIsNotAuthenticated // redirect to dashboard if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({firebase}) => ({
    authError: populate(firebase, 'authError')
  })
)
export default class Signup extends Component {
  state = {
    snackCanOpen: false,
    roleIndex: 0,
    role: 'athlete-pending'
  }

  static propTypes = {
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    firebase: PropTypes.object,
    authError: PropTypes.object
  }

  handleSignup = ({ email, password }) => {
    const { firebase } = this.props;
    const { createUser, update } = firebase;
    this.setState({ snackCanOpen: true });
    // create new user then login (redirect handled by factory)

    return createUser({ email, password })
      .then((newUser) => {
        let {uid} = this.props.auth;
        update(`${rfConfig.userProfile}/${uid}`, {
          uid: uid,
          role: this.state.role,
          timezone: moment.tz.guess()
        });
      });
  }

  handleRoleChange = (index) => {
    this.setState({
      roleIndex: index,
      role: index == 0 ? 'athlete-pending' : 'mentor-pending'
    });
  };

  handleSnackbarClick = () => {
    this.setState({
      snackCanOpen: false
    });
  };

  providerLogin = (provider) => {
    this.setState({ snackCanOpen: true })

    return this.props.firebase.login({ provider })
  }

  render () {
    const { authError } = this.props
    const { snackCanOpen } = this.state

    return (
      <div className={classes.wrapper}>
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
        {
          <Snackbar
            active={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
            type='warning'
            action='close'
            label={authError ? authError.message : 'Signup error'}
            onClick={() => this.handleSnackbarClick}
            onTimeout={() => this.handleSnackbarClick}
            timeout={3000}
          />
        }
      </div>
    )
  }
}
