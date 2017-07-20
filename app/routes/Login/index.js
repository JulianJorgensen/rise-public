import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import Snackbar from 'components/Snackbar';
import { Card } from 'react-toolbox/lib/card';
import { userIsNotAuthenticated } from 'utils/router';
import { SIGNUP_PATH } from 'app/constants';
import LoginForm from './components/LoginForm';
import classes from './index.css';

@userIsNotAuthenticated
@firebaseConnect()
@connect(
  ({ notification, firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    notification
  })
)
export default class Login extends Component {
  static propTypes = {
    firebase: PropTypes.shape({
      login: PropTypes.func.isRequired
    }),
    authError: PropTypes.shape({
      message: PropTypes.string
    })
  }

  state = {
    // state of snackbar so it can be closed
    snackCanOpen: false
  }

  handleSnackbarClick = () => {
    this.setState({
      snackCanOpen: false
    });
  };

  handleLogin = loginData => {
    this.setState({ snackCanOpen: true });
    this.props.firebase.login(loginData).then(() => {
    });
  }

  providerLogin = (provider) =>
    this.handleLogin({ provider })

  render () {
    const { authError, firebase } = this.props
    const { snackCanOpen } = this.state

    console.log('authError: ', authError);
    console.log('firebase: ', firebase);
    console.log('firebase auth: ', firebase.auth);

    return (
      <div className={classes.wrapper}>
        <Card className={classes.panel}>
          <LoginForm onSubmit={this.handleLogin} />
        </Card>
        <div className={classes.or}>
          or
        </div>
        <div className={classes.providers}>
          <GoogleButton onClick={() => this.providerLogin('google')} />
        </div>
        <div className={classes.signup}>
          <span className={classes.signupLabel}>
            Need an account?
          </span>
          <Link className={classes.signupLink} to={'/signup'}>
            Sign Up
          </Link>
        </div>
        <Snackbar
          active={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
          type='warning'
          action='close'
          label={authError ? authError.message : 'Signup error'}
          onClick={() => this.handleSnackbarClick}
          timeout={3000}
          onTimeout={this.handleSnackbarClick}
        />
      </div>
    )
  }
}
