import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import Snackbar from 'components/Snackbar';
import { Card } from 'react-toolbox/lib/card';
import EmailForm from './components/EmailForm';
import classes from './index.css';


@firebaseConnect()
@connect()
export default class RecoverContainer extends Component {
  state = {
    message: null,
    open: false
  }

  sendRecoveryEmail = ({ email }) =>
    this.props.firebase
      .resetPassword(email)
      .then(() => {
        this.props.dispatch({
          type: 'SET_SNACKBAR',
          message: 'Account Recovery Email Sent',
          style: 'alert'
        });
      })
      .catch((err) => {
        console.error('Error updating account', err) // eslint-disable-line no-console
        this.setState({ message: err.message || 'Error' }) // show error snackbar
        return Promise.reject(err)
      })

  render () {
    return (
      <div className={classes.container}>
        <h2>Forgot Password</h2>
        <Card>
          <EmailForm onSubmit={this.sendRecoveryEmail} />
        </Card>
      </div>
    )
  }
}
