import React, { Component, PropTypes } from 'react';
import { Link, withRouter } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { Card } from 'react-toolbox/lib/card';
import { userIsNotAuthenticated } from 'utils/router';
import { SIGNUP_PATH } from 'app/constants';
import LoginForm from './components/LoginForm';
import classes from './index.css';

@withRouter
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

  handleLogin = loginData => {
    let { authError } = this.props;
    if (isLoaded(authError) && !isEmpty(authError)) {
      dispatch({
        type: 'SET_SNACKBAR',
        message: authError.message,
        style: 'error'
      });
    }else{
      this.props.firebase.login(loginData).then(() => {
        this.props.history.push('/dashboard');
      });
    }
  }

  providerLogin = (provider) =>
    this.handleLogin({ provider })

  render () {
    const { authError, firebase } = this.props

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
      </div>
    )
  }
}
