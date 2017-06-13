import React, { Component, PropTypes } from 'react'
import { firebaseConnect } from 'react-redux-firebase'
import { Snackbar } from 'react-toolbox'
import { Card } from 'react-toolbox/lib/card'
import EmailForm from '../components/EmailForm'
import classes from './RecoverContainer.css'

@firebaseConnect() // adds this.props.firebase
export default class RecoverContainer extends Component {
  static propTypes = {
    firebase: PropTypes.object
  }
  state = {
    message: null,
    open: false
  }

  sendRecoveryEmail = ({ email }) =>
    this.props.firebase
      .resetPassword(email)
      .then(() => {
        this.setState({
          message: 'Account Recovery Email Sent',
          open: true
        })
      })
      .catch((err) => {
        console.error('Error updating account', err) // eslint-disable-line no-console
        this.setState({ message: err.message || 'Error' }) // show error snackbar
        return Promise.reject(err)
      })

  render () {
    return (
      <div className={classes.container}>
        <Card>
          <EmailForm onSubmit={this.sendRecoveryEmail} />
        </Card>
        <Snackbar
          active={this.state.open}
          type='warning'
          action='OK'
          label={this.state.message || 'Error'}
          onClick={this.handleSnackbarClick}
          timeout={4000}
          onTimeout={this.handleSnackbarClick}
        />
      </div>
    )
  }
}
