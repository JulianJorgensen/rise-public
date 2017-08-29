import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated } from 'utils/router';
import { isMentor, removePopulatedData, updateAccount, activateUser } from 'utils/utils';

import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { Elements } from 'react-stripe-elements';
import { AddCard } from 'containers/Payment';

import BankingForm from 'containers/BankingForm';
import LoadingSpinner from 'components/LoadingSpinner';

import classes from './index.css';

@withRouter
@userIsAuthenticated
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

  completePaymentSetup = () => {
    let { role, hasSubmittedApplication, hasConfirmedAgreements } = this.props.account;

    this.setState({
      finished: true
    });

    updateAccount(this.props.firebase, this.props.auth.uid, {
      hasSetupPayment: true,
      role: (hasConfirmedAgreements || isMentor(role)) ? role.name : `${role.name}-pending`
    });
  }

  render () {
    const { account } = this.props;
    let { finished } = this.state;

    if (!account) {
      return <LoadingSpinner />
    }

    if (account.hasSetupPayment || finished) {
      return (
        <div>
          <h1>Excellent!</h1>
          <h2>You've setup payment</h2>
        </div>
      )
    }

    if(isMentor(account.role)) {
      return (
        <div className={classes.container}>
          <h2>We need your payment info!</h2>
          <BankingForm
            initialValues={account}
            account={account}
            onSubmit={this.completePaymentSetup}
          />
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <h2>We need your payment info!</h2>
        <p>Step 1 : We care about your privacy & security which is why we work with Stripe! Enter your CC info & it will get automatically store in Stripe.</p>
        <p>Step 2 : Schedule your 1st call with your mentor & you will get charged after your initial call!</p>
        <Elements>
          <div>
            <AddCard onSubmit={this.completePaymentSetup} />
          </div>
        </Elements>
      </div>
    )
  }
}
