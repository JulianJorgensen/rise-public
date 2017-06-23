import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import Snackbar from 'components/Snackbar';
import {Tab, Tabs} from 'react-toolbox';
import { LOGIN_PATH } from 'constants';
import { UserIsNotAuthenticated } from 'utils/router';
import AthleteSignupForm from '../components/AthleteSignupForm';
import MentorSignupForm from '../components/MentorSignupForm';
import classes from './SignupContainer.css';

import { Card } from 'react-toolbox/lib/card';


@UserIsNotAuthenticated // redirect to dashboard if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({firebase}) => ({
    auth: pathToJS(firebase, 'auth'),
    authError: pathToJS(firebase, 'authError')
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
        update(`${rfConfig.userProfile}/${this.props.auth.uid}`, {
          role: this.state.role
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
      <div className={classes.container}>
        <Tabs theme={classes} index={this.state.roleIndex} onChange={() => this.handleRoleChange} inverse>
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
