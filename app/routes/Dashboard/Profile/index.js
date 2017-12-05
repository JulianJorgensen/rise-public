import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'

import { removePopulatedData, updateAccount, isMentor } from 'utils/utils';

import { Card } from 'react-toolbox/lib/card';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';

import LoadingSpinner from 'components/LoadingSpinner';
import AccountForm from 'containers/AccountForm/AccountForm';
import SportsFormMentor from 'containers/SportsFormMentor';
import SportsFormAthlete from 'containers/SportsFormAthlete';

import Snackbar from 'components/Snackbar';
import classes from './index.css';

@userIsAuthenticated
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class Profile extends Component {
  state = {
    modalOpen: false,
    index: 0
  }

  handleSubmit = (newData) => {
    newData = removePopulatedData(newData);
    updateAccount(this.props.firebase, this.props.account.uid, newData).then(() => {
      this.props.dispatch({
        type: 'SET_SNACKBAR',
        message: 'Account successfully updated'
      });
    });
  }

  handleTabChange = (index) => {
    this.setState({ index });
  };

  render() {
    const { account } = this.props;

    if (!account) {
      return <LoadingSpinner />
    }

    return (
      <div className={classes.container}>
        <h2>You're awesome!</h2>
        <p>We want to know all about you! Use this profile space to edit your personal bio & more!</p>
        <Tabs index={this.state.index} onChange={this.handleTabChange}>
          <Tab label='Personal info'>
            <AccountForm
              initialValues={account}
              account={account}
              onSubmit={this.handleSubmit}
              submitLabel='Update'
            />
          </Tab>
          {isMentor(account.role) ?
            <Tab label='Sport info'>
              <SportsFormMentor
                initialValues={account}
                account={account}
                onSubmit={this.handleSubmit}
                submitLabel='Update'
              />
            </Tab>
            : ''
          }
        </Tabs>
      </div>
    )
  }
}
