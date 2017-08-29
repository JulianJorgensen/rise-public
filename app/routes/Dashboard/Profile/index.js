import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'

import { removePopulatedData, updateAccount } from 'utils/utils';

import { Card } from 'react-toolbox/lib/card';
import Avatar from 'react-toolbox/lib/avatar';
import LoadingSpinner from 'components/LoadingSpinner';
import ProfileForm from './components/ProfileForm/ProfileForm';
import classes from './index.css';

@userIsAuthenticated
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Profile extends Component {
  state = { modalOpen: false }

  updateAccount = (newData) => {
    newData = removePopulatedData(newData);
    updateAccount(this.props.firebase, this.props.auth.uid, newData);
  }

  render () {
    const { account } = this.props;

    return (
      <Card className={classes.container}>
        {/* <div className={classes.avatarContainer}>
          <Avatar
            className={classes.avatar}
            image={account && account.avatarUrl || '/images/User.png'}
            cover
          />
        </div> */}
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
