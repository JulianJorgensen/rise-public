import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import _ from 'lodash';
import { isMentor, isAdmin } from 'utils/utils';
import Button from 'components/Button';
import classes from './index.css';

import ChooseType from './components/ChooseType';
import MeetingConfirmation from './components/MeetingConfirmation';
import ScheduleForm from './components/ScheduleForm';

import LoadingSpinner from 'components/LoadingSpinner';

const defaultState = {
  recurring: null,
  selectedAthlete: null,
  selectedDateTime: '',
  showConfirmation: false,
  isConfirmed: false
};

@userIsAuthenticated
//@userHasPermission('schedule')
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class ScheduleNew extends Component {
  state = defaultState;

  handleSelectedAthlete = (selectedAthlete) => {
    this.setState({
      selectedAthlete
    });
  }

  handleSetDateTime = (dateTime) => {
    this.setState({
      selectedDateTime: dateTime
    });
  };

  handleRecurring = (value) => {
    this.setState({
      recurring: value
    });
  }

  handleConfirmation = (event) => {
    event.preventDefault();
    this.setState({
      showConfirmation: true
    });
  };

  handleHideConfirmation = () => {
    this.setState({
      showConfirmation: false
    });
  }

  handleReset = () => {
    this.setState(defaultState);
  };

  render () {
    let { account } = this.props;

    if(!account) {
      return <LoadingSpinner />
    }

    let { selectedAthlete, recurring, selectedDateTime, showAvailableTimes, showDatesModal, showConfirmation, isConfirmed } = this.state;
    let selectedAthleteAccount = selectedAthlete && account.athletes ? _.find(account.athletes, { 'uid': selectedAthlete }) : '';
    let hasChosenType = recurring !== null;
    let athletesArr = Object.keys(account.athletes).map((k) => account.athletes[k]);

    let assignedAthletes = athletesArr ? athletesArr.map((mentee) => {
      return {
        value: mentee.uid,
        label: `${mentee.firstName ? mentee.firstName : mentee.email} ${mentee.lastName ? mentee.lastName : ''}`
      };
    }) : '';


    if (account.role.name === 'athlete' && !account.mentor) {
      return (
        <div className={classes.container}>
          <h4>You haven’t been assigned a RISE Mentor yet!</h4>
          <p>Please check back soon, as you will be paired up within 1-2 days of signing up.</p>
          <p>#RISEon</p>
        </div>
      )
    }

    if (isMentor(account.role) && !account.athletes) {
      return (
        <div className={classes.container}>
          <h4>You currently don't have any athletes assigned.</h4>
        </div>
      )
    }

    if (isMentor(account.role) && !account.acuityCalendarId) {
      return (
        <div className={classes.container}>
          <h4>You haven't connected your Acuity Calendar yet.</h4>
          <Button
            href='/dashboard/settings'
            label='Set your Acuity Calendar ID in settings'
          />
        </div>
      )
    }

    if (hasChosenType) {
      return (
        <div className={classes.container}>
          <ScheduleForm
            show={!isConfirmed}
            account={account}
            onSubmit={this.handleConfirmation}
            recurring={recurring}
            handleRecurring={(value) => this.handleRecurring(value)}
            handleSelectedAthlete={this.handleSelectedAthlete}
            assignedAthletes={assignedAthletes}
            selectedAthlete={this.state.selectedAthlete}
            selectedAthleteAccount={selectedAthleteAccount}
            onSetDateTime={this.handleSetDateTime}
          />

          <MeetingConfirmation
            selectedDateTime={selectedDateTime}
            recurring={recurring}
            selectedAthlete={selectedAthlete}
            isConfirmed={isConfirmed}
            showConfirmation={showConfirmation}
            handleHideConfirmation={this.handleHideConfirmation}
            reset={this.handleReset}
            onConfirm={() => {
              this.setState({
                isConfirmed: true
              });
            }}
          />
        </div>
      )
    }else{
      return (
        <ChooseType
          handleRecurring={this.handleRecurring}
        />
      )
    }
  }
}
