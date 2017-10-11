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
    account: pathToJS(firebase, 'profile')
  })
)
export default class Settings extends Component {
  state = {
    tab: 0
  }

  handleTabChange = (tab) => {
    this.setState({ tab });
  };

  updateAccount = (newData) => {
    newData = removePopulatedData(newData);
    updateAccount(this.props.firebase, this.props.account.uid, newData);
  }

  triggerUpdate = () => {
    this.setState({
      updated: true
    });
  }

  render() {
    const { account } = this.props;

    if (!account) {
      return <LoadingSpinner />
    }

    return (
      <div>
        {/* <h2>Your account settings!</h2>
        <p>Access your username, change your password, and set up payment info here!</p> */}
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
            {!isMentor(account.role) ?
              <Tab label='Payment'>
                <Elements>
                  <div>
                    <ExistingCards updated={this.state.updated} />
                    <AddCard onSubmit={this.completePaymentSetup} triggerUpdate={this.triggerUpdate} />
                  </div>
                </Elements>
              </Tab>
            : '' }
          </Tabs>
        </div>
      </div>
    )
  }
}
