import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, pathToJS } from 'react-redux-firebase';
import Snackbar from 'components/Snackbar';
import { Card } from 'react-toolbox/lib/card';
import { UserIsNotAuthenticated } from 'utils/router';
import { SIGNUP_PATH } from 'constants';
import LoginForm from '../components/LoginForm';
import classes from './LoginContainer.css';

@UserIsNotAuthenticated // redirect to list page if logged in
@firebaseConnect() // add this.props.firebase
@connect( // map redux state to props
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError')
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
    this.setState({ snackCanOpen: true })
    return this.props.firebase.login(loginData)
  }

  providerLogin = (provider) =>
    this.handleLogin({ provider })

  render () {
    const { authError } = this.props
    const { snackCanOpen } = this.state

    return (
      <div className={classes.container}>
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
          <Link className={classes.signupLink} to={SIGNUP_PATH}>
            Sign Up
          </Link>
        </div>
        <Snackbar
          active={isLoaded(authError) && !isEmpty(authError) && snackCanOpen}
          type='warning'
          action='close'
          label={authError ? authError.message : 'Signup error'}
          onClick={this.handleSnackbarClick}
          timeout={3000}
          onTimeout={this.handleSnackbarClick}
        />
      </div>
    )
  }
}
