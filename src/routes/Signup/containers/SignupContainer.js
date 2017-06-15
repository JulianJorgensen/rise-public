import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase';
import Snackbar from 'components/Snackbar';
import { LOGIN_PATH } from 'constants';
import { UserIsNotAuthenticated } from 'utils/router';
import SignupForm from '../components/SignupForm';
import classes from './SignupContainer.css';

import { Card } from 'react-toolbox/lib/card';


@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({firebase}) => ({
    authError: pathToJS(firebase, 'authError')
  })
)
export default class Signup extends Component {
  static propTypes = {
    firebase: PropTypes.object,
    authError: PropTypes.object
  }

  state = {
    snackCanOpen: false
  }

  handleSignup = ({ email, password }) => {
    const { createUser, login } = this.props.firebase;
    this.setState({ snackCanOpen: true });
    // create new user then login (redirect handled by decorator)
    return createUser({ email, password }, { email })
      .then(() => login({ email, password }));
  }

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
        <Card>
          <SignupForm onSubmit={this.handleSignup} />
        </Card>
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
            onClick={this.handleSnackbarClick}
            timeout={3000}
            onTimeout={this.handleSnackbarClick}
          />
        }
      </div>
    )
  }
}
