import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated } from 'utils/router';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import { updateAccount, isAthlete, isMentor, removePopulatedData } from 'utils/utils';

import LoadingSpinner from 'components/LoadingSpinner';
import Button from 'components/Button';
import AccountForm from 'containers/AccountForm/AccountForm';
import SportsFormMentor from 'containers/SportsFormMentor';
import SportsFormAthlete from 'containers/SportsFormAthlete';

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

    let { account } = this.props;

    // send confirmation email to user
    axios.post(`${fbConfig.functions}/sendEmail`, {
      toName: account.firstName,
      toEmail: account.email,
      subject: `Thank you ${account.firstName}!`,
      template: 'applicationConfirmation.pug'
    })
    .then((response) => {
    })
    .catch((error) => {
    });

    // scroll to top
    window.scrollTo(0, 0);
  }

  render () {
    const { account } = this.props;
    let { finished } = this.state;

    if (!account) {
      return <LoadingSpinner />
    }

    if (account.applicationApproved) {
      if (isAthlete(account.role)) {
        return (
          <div className={classes.container}>
            <h2>Congratulations! You’ve been accepted as a RISE Athlete!</h2>
            <p>Let’s go through some of the nitty gritty details. Be sure to read through carefully WITH A PARENT/GUARDIAN and check the box to agree with each section.</p>
            <Button href='/getting-started/agreements' label='Fill out the agreements' />
          </div>
        )
      }
    }

    if (account.hasSubmittedApplication || finished) {
      return (
        <div className={classes.container}>
          <h1>Great job!</h1>
          <h2>We will review your application as soon as possible.</h2>
        </div>
      )
    }

    return (
      <div className={classes.container}>
        { isMentor(account.role) ?
          <p>You’re about to fill out an application to become a RISE Mentor. We want to learn a bit more about you! We’ll connect with you once you’ve been accepted</p>
          :
          <div>
            <p>You’re about to fill out an application that will be sent for acceptance into RISE Athletes. We want to learn a bit about you, and once you fill out this information, you’ll be paired with a mentor that best fits you.</p>
            <p>What to expect: Once accepted, you’ll set up your account here. Once all is completed, you will: </p>
            <ul>
              <li>have full access to the platform</li>
              <li>be paired with your mentor </li>
              <li>begin scheduling your meetings! </li>
            </ul>
            <p>Let’s get started! Take your time with answering these questions. They’ll help us find you the best mentor for you. </p>
          </div>
        }

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
