import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { isMentor, removePopulatedData, updateAccount } from 'utils/utils';

import { Elements } from 'react-stripe-elements';
import { AddCard, ExistingCards } from 'containers/Payment';

import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import Avatar from 'react-toolbox/lib/avatar';
import { Card } from 'react-toolbox/lib/card';
import LoadingSpinner from 'components/LoadingSpinner';
import SettingsFormAthlete from './components/SettingsFormAthlete';
import SettingsFormMentor from './components/SettingsFormMentor';
import MentorBankingForm from './components/MentorBankingForm';
import classes from './index.css';

@userIsAuthenticated
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Settings extends Component {
  state = {
    tab: 0
  }

  handleTabChange = (tab) => {
    this.setState({tab});
  };

  updateAccount = (newData) => {
    newData = removePopulatedData(newData);
    updateAccount(this.props.firebase, this.props.auth.uid, newData);
  }

  render () {
    const { account } = this.props;

    return (
      <div className={classes.container}>
        <Tabs index={this.state.tab} theme={classes} onChange={this.handleTabChange}>
          <Tab label='General'>
            {isMentor(account.role) ?
              <SettingsFormMentor
                initialValues={account}
                account={account}
                onSubmit={this.updateAccount}
              /> :
              <SettingsFormAthlete
                initialValues={account}
                account={account}
                onSubmit={this.updateAccount}
              />
            }
          </Tab>
          <Tab label='Payment'>
            {isMentor(account.role) ?
              <MentorBankingForm
                initialValues={account}
                account={account}
                onSubmit={this.updateAccount}
                submitLabel='Change Stripe Email'
              /> :
              <Elements>
                <div>
                  <ExistingCards />
                  <AddCard onSubmit={this.completePaymentSetup} />
                </div>
              </Elements>
            }
          </Tab>
        </Tabs>
      </div>
    )
  }
}
