import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated } from 'utils/router';
import { updateAccount } from 'utils/utils';

import AgreementsFormAthlete from 'containers/AgreementsFormAthlete';
import LoadingSpinner from 'components/LoadingSpinner';
import Button from 'components/Button';

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

  render() {
    const { account } = this.props;
    let { finished } = this.state;

    if (!account) {
      return <LoadingSpinner />
    }

    if (account.hasConfirmedAgreements || finished) {
      return (
        <div className={classes.container}>
          <h2>Excellent! You've agreed to our terms and conditions.</h2>
          {account.hasSetupPayment ? <h2>You now have full access to your RISE Dashboard. Go ahead, click around and get to know the site a bit.</h2> : <Button label='Next' href='/getting-started/payment' />}
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <AgreementsFormAthlete
          onSubmit={this.confirm}
        />
      </div>
    )
  }
}
