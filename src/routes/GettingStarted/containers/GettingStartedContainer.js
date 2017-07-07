import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { UserIsAuthenticated, UserHasPermission } from 'utils/router'
import axios from 'axios';
import defaultUserImageUrl from 'static/images/User.png';
import {Tab, Tabs} from 'react-toolbox';
import LoadingSpinner from 'components/LoadingSpinner';
import AccountForm from '../components/AccountForm/AccountForm';
import SportsForm from '../components/SportsForm/SportsForm';
import BankingForm from '../components/BankingForm/BankingForm';
import classes from './GettingStartedContainer.css';

@UserIsAuthenticated // redirect to /login if user is not authenticated
// @UserHasPermission('getting-started')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class GettingStarted extends Component {
  state = {
    step: 0,
    message: 'Let’s get you all set up!',
    finished: false
  }

  static propTypes = {
    account: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    firebase: PropTypes.shape({
      update: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  }

  updateFirebase = (newData) => {
    newData = {
      ...newData,
      role: `${newData.role.name}${newData.status === 'pending' ? '-pending' : ''}`,
      mentor: newData.mentor.uid
    }
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
    this.updateFirebase(newData);

    // proceed to next step
    this.handleStepChange(this.state.step + 1);

    // scroll to top
    window.scrollTo(0, 0);
  }

  finishSteps = (newData) => {
    // update firebase
    newData = {
      ...newData,
      hasSubmittedDetails: true
    }
    this.updateFirebase(newData);

    // parse data into email format
    let {role} = newData;
    let parsedUserData = Object.assign(newData, {
      uid: this.props.auth.uid,
      role: role.name
    });

    // send notification email to admin
    axios.post('https://us-central1-rise-1602c.cloudfunctions.net/adminAlertEmail', {
      message: `We have a new ${role.name} user to setup...`,
      userData: parsedUserData
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log('Error sending admin alert email: ', error);
    });

    // log message
    this.setState({
      finished: true
    });

    // scroll to top
    window.scrollTo(0, 0);
  }

  render () {
    const { account } = this.props;

    if (!isLoaded(account)) {
      return <LoadingSpinner />
    }

    if (account && account.hasSubmittedDetails){
      this.setState({
        finished: true
      });
    }

    let renderSteps = () => {
      if (!this.state.finished){
        return (
          <Tabs index={this.state.step} theme={classes} onChange={this.handleStepChange}>
            <Tab label='1. Personal info' disabled={this.state.step !== 0}>
              <AccountForm
                initialValues={account}
                account={account}
                onSubmit={this.nextStep}
              />
            </Tab>
            <Tab label='2. Sport info' disabled={this.state.step !== 1}>
              <SportsForm
                initialValues={account}
                account={account}
                onSubmit={this.nextStep}
                handleBack={this.prevStep}
              />
            </Tab>
            <Tab label='3. Banking info' disabled={this.state.step !== 2}>
              <BankingForm
                initialValues={account}
                account={account}
                handleBack={this.prevStep}
                onSubmit={this.finishSteps}
              />
            </Tab>
          </Tabs>
        )
      }
    }

    return (
      <div className={classes.container}>
        <h2>{this.state.finished ? 'Great job! Your application is in process. We will be in touch...' : this.state.message}</h2>
        {renderSteps()}
      </div>
    )
  }
}
