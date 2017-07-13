import React, { Component, PropTypes } from 'react';
import { Card } from 'react-toolbox/lib/card';
import { connect } from 'react-redux';
import { firebaseConnect, populate } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'

import Avatar from 'react-toolbox/lib/avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import SettingsForm from '../components/SettingsForm/SettingsForm';
import classes from './SettingsContainer.css';

@userIsAuthenticated // redirect to /login if user is not authenticated
// @userHasPermission('settings')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    account: populate(firebase, 'profile')
  })
)
export default class Settings extends Component {
  static propTypes = {
    account: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    firebase: PropTypes.shape({
      update: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  }

  state = { modalOpen: false }

  handleLogout = () => this.props.firebase.logout()

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  updateAccount = (newData) => {
    newData = {
      ...newData,
      role: `${newData.role.name}${newData.status === 'pending' ? '-pending' : ''}`,
      mentor: newData.mentor ? newData.mentor.uid : null
    }

    this.props.firebase
      .update(`${rfConfig.userProfile}/${this.props.auth.uid}`, newData)
      .catch((err) => {
        console.error('Error updating account', err) // eslint-disable-line no-console
      })
    }
  render () {
    const { account } = this.props;

    if (!isLoaded(account)) {
      return <LoadingSpinner />
    }

    return (
      <Card className={classes.container}>
        <SettingsForm
          initialValues={account}
          account={account}
          onSubmit={this.updateAccount}
        />
      </Card>
    )
  }
}
