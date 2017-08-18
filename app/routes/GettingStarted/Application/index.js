import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { isMentor, removePopulatedData } from 'utils/utils';

import LoadingSpinner from 'components/LoadingSpinner';
import AccountForm from 'containers/AccountForm/AccountForm';
import SportsFormMentor from 'containers/SportsFormMentor';
import SportsFormAthlete from 'containers/SportsFormAthlete';

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
export default class Application extends Component {
  state = {
    step: 0,
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

  handleStepChange = (index) => {
    this.setState({ step: index });
  };

  prevStep = () => {
    // back to last step
    this.handleStepChange(this.state.step - 1);

    // scroll to top
    window.scrollTo(0, 0);
  }

  nextStep = (newData) => {
    // update firebase
    if (newData) this.updateFirebase(newData);

    // proceed to next step
    this.handleStepChange(this.state.step + 1);

    // scroll to top
    window.scrollTo(0, 0);
  }

  finishSteps = (newData) => {
    // update firebase
    newData = {
      ...newData,
      hasSubmittedApplication: true
    }
    this.updateFirebase(newData);

    // set state as finished
    this.setState({finished: true});

    // parse data into email format
    let { role } = newData;
    let parsedUserData = Object.assign(newData, {
      uid: this.props.auth.uid,
      role: role.name
    });

    // send notification email to admin
    axios.post(`${fbConfig.functions}/adminAlertEmail`, {
      message: `We have a new ${role.name} application to review!`,
      userData: parsedUserData
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('Error sending admin alert email: ', error);
    });

    // scroll to top
    window.scrollTo(0, 0);
  }

  render () {
    const { account } = this.props;
    let { finished } = this.state;

    if (account.applicationApproved) {
      return (
        <div>
          <h1>Congratulations!</h1>
          <h2>You have been approved!</h2>
          <p>What's next?</p>
          <ul>
            <li><Link to='/getting-started/agreements'>Fill out the Agreements</Link></li>
            <li><Link to='/getting-started/payment'>Setup a payment method</Link></li>
          </ul>
        </div>
      )
    }

    if (account.hasSubmittedApplication || finished) {
      return (
        <div>
          <h1>Great job!</h1>
          <h2>We will review your application as soon as possible.</h2>
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <h3>Please fill out the application below</h3>
        <Tabs index={this.state.step} theme={classes} onChange={this.handleStepChange}>
          <Tab label='1. Personal info' disabled={this.state.step !== 0}>
            <AccountForm
              initialValues={account}
              account={account}
              onSubmit={this.nextStep}
            />
          </Tab>
          <Tab label='2. Sport info' disabled={this.state.step !== 1}>
            {isMentor(account.role) ?
              <SportsFormMentor
                initialValues={account}
                account={account}
                handleBack={this.prevStep}
                onSubmit={this.finishSteps}
                submitLabel='Submit application'
              /> :
              <SportsFormAthlete
                initialValues={account}
                account={account}
                handleBack={this.prevStep}
                onSubmit={this.finishSteps}
                submitLabel='Submit application'
              />
            }
          </Tab>
        </Tabs>
      </div>
    )
  }
}
