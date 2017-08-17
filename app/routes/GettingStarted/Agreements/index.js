import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';

import AgreementsFormAthlete from 'containers/AgreementsFormAthlete';
import LoadingSpinner from 'components/LoadingSpinner';

import classes from './index.css';

@userIsAuthenticated
@userHasPermission('getting-started')
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Agreements extends Component {
  state = {
    finished: false
  }

  confirm = () => {
    console.log('confirmed!');
  }

  updateFirebase = (newData) => {
    newData = removePopulatedData(newData);
    this.props.firebase
      .update(`${rfConfig.userProfile}/${this.props.auth.uid}`, newData)
      .catch((err) => {
        console.error('Error updating account', err) // eslint-disable-line no-console
      })
  }

  render () {
    const { account } = this.props;
    let { finished } = this.state;

    if (account.hasConfirmedAgreements || finished) {
      return (
        <div>
          <h1>Excellent!</h1>
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <AgreementsFormAthlete
          initialValues={account}
          onSubmit={this.confirm}
          submitLabel='CLICK TO CONFIRM AND ACCEPT'
        />
      </div>
    )
  }
}
