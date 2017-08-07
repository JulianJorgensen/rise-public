import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'

import { Card } from 'react-toolbox/lib/card';
import Avatar from 'react-toolbox/lib/avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import ProfileForm from './components/ProfileForm/ProfileForm';
import classes from './index.css';

@userIsAuthenticated // redirect to /login if user is not authenticated
@userHasPermission('profile')
@firebaseConnect() // add this.props.firebase
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Profile extends Component {
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
    let menteesFirebaseFormatted = newData.mentees.map((mentee, index) => {
      return mentee.uid
    });

    newData = {
      ...newData,
      role: `${newData.role.name}${newData.status === 'pending' ? '-pending' : ''}`,
      mentor: newData.mentor ? newData.mentor.uid : null,
      mentees: menteesFirebaseFormatted
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
        <div className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
            image={account && account.avatarUrl || '/images/User.png'}
            cover
            onClick={() => this.toggleModal}
          />
        </div>
        <div className={classes.meta}>
          <ProfileForm
            initialValues={account}
            account={account}
            onSubmit={this.updateAccount}
          />
        </div>
      </Card>
    )
  }
}