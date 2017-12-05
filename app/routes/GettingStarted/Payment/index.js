import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
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

  render() {
    const { account } = this.props;
    let { finished } = this.state;

    if (!account) {
      return <LoadingSpinner />
    }

    if (account.hasSetupPayment || finished) {
      return (
        <div className={classes.container}>
          {account.hasConfirmedAgreements ?
            <div><h2>Great! Your payment details have been updated!</h2><h3>You now have full access to your RISE Dashboard. Go ahead, click around and get to know the site a bit.</h3></div>
            :
            <div><h2>Great! You've submitted payment details</h2><p>Now <Link to='/getting-started/agreements'>fill out the agreements</Link>.</p></div>}
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <h2>Let’s get your payment info set up.</h2>
        <p>We care about your privacy and settings which is why we work with Stripe. Your info will automatically be stored in Stripe, not on our site.</p>
        <p>In order to get started with RISE Athletes, we will help you create a Stripe Account. RISE Athletes charges $350/month for 4 months.</p>
        <p>NOTE: Your account will be charged monthly from when you schedule your first meeting with your RISE Mentor.</p>

        <Elements>
          <div>
            <AddCard onSubmit={this.completePaymentSetup} />
          </div>
        </Elements>
      </div>
    )
  }
}
