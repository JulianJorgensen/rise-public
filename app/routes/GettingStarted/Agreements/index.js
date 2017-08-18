import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { updateAccount } from 'utils/utils';

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
    let { role, hasSubmittedApplication, hasSetupPayment } = this.props.account;

    this.setState({
      finished: true
    });

    updateAccount(this.props.firebase, this.props.auth.uid, {
      hasConfirmedAgreements: true,
      role: hasSetupPayment ? role.name : `${role.name}-pending`
    });
  }

  render () {
    const { account } = this.props;
    let { finished } = this.state;

    if (account.hasConfirmedAgreements || finished) {
      return (
        <div>
          <h1>Excellent!</h1>
          <h2>You've confirmed all agreements</h2>
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
