import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { isMentor, removePopulatedData } from 'utils/utils';

import BankingForm from 'containers/BankingForm';
import PaymentForm from 'containers/PaymentForm';

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
export default class Payment extends Component {
  state = {
    finished: false
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

    if(isMentor(account.role)) {
      return (
        <div className={classes.container}>
          <BankingForm
            initialValues={account}
            account={account}
            handleBack={this.prevStep}
            onSubmit={this.finishSteps}
          />
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <PaymentForm
          initialValues={account}
          account={account}
          onSubmit={this.nextStep}
        />
      </div>
    )
  }
}
