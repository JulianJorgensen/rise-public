import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { Tab, Tabs } from 'react-toolbox/lib/tabs';
import LoadingSpinner from 'components/LoadingSpinner';
import AccountForm from 'containers/AccountForm/AccountForm';
import SportsFormMentor from 'containers/SportsFormMentor';
import SportsFormAthlete from 'containers/SportsFormAthlete';
import BankingForm from 'containers/BankingForm';
import PaymentForm from 'containers/PaymentForm';
import ConfirmationFormAthlete from 'containers/ConfirmationFormAthlete';
import classes from './index.css';

import defaultUserImageUrl from 'assets/images/User.png';

@userIsAuthenticated // redirect to /login if user is not authenticated
@userHasPermission('getting-started')
@firebaseConnect() // add this.props.firebase
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

  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.shape({
      update: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  }

  updateFirebase = (newData) => {
    let menteesFirebaseFormatted = [];
    if (newData.mentees) {
      menteesFirebaseFormatted = newData.mentees.map((mentee, index) => {
        return mentee.uid
      });
    }

    newData = {
      ...newData,
      role: `${newData.role.name}${newData.status === 'pending' ? '-pending' : ''}`,
      mentor: newData.mentor ? newData.mentor.uid : null,
      mentees: menteesFirebaseFormatted
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
    console.log('handling back');
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
      hasSubmittedDetails: true
    }
    this.updateFirebase(newData);

    // set state as finished
    this.setState({finished: true});

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

    // scroll to top
    window.scrollTo(0, 0);
  }

  render () {
    const { account } = this.props;
    let { finished } = this.state;

    let isMentor = account.role.name === 'mentor' ? true : false;

    if (!isLoaded(account)) {
      return <LoadingSpinner />
    }

    let renderSteps = () => {
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
            {isMentor ?
              <SportsFormMentor
                initialValues={account}
                account={account}
                onSubmit={this.nextStep}
                handleBack={this.prevStep}
              /> :
              <SportsFormAthlete
                initialValues={account}
                account={account}
                onSubmit={this.nextStep}
                handleBack={this.prevStep}
              />
            }
          </Tab>
          {isMentor ?
            <Tab label='3. Getting paid' disabled={this.state.step !== 2}>
              <BankingForm
                initialValues={account}
                account={account}
                handleBack={this.prevStep}
                onSubmit={this.finishSteps}
              />
            </Tab> :
            <Tab label='3. Payment' disabled={this.state.step !== 2}>
              <PaymentForm
                initialValues={account}
                account={account}
                hasBackButton={true}
                handleBack={this.prevStep}
                onSubmit={this.nextStep}
              />
            </Tab>
          }
          {!isMentor ?
            <Tab label='4. Confirmation' disabled={this.state.step !== 3}>
              <ConfirmationFormAthlete
                initialValues={account}
                account={account}
                handleBack={this.prevStep}
                onSubmit={this.finishSteps}
              />
            </Tab>
          : ''}
        </Tabs>
      )
    }

    let renderContent = () => {
      console.log('rendering account: ', account);
      if(account.status === 'confirmed' && account.hasSubmittedDetails){
        return (
          <h2>Congratulations. You have been approved!</h2>
        )
      }else if (account.hasSubmittedDetails || finished) {
        return (
          <h2>Great job! We will review your profile as soon as possible</h2>
        )
      }else{
        return (
          <div>
            <h2>Please fill out the application</h2>
            {renderSteps()}
          </div>
        )
      }
    }

    return(
      <div className={classes.container}>
        {account ? renderContent() : <LoadingSpinner />}
      </div>
    )
  }
}
