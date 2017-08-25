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

const defaultState = {
  recurring: null,
  selectedAthlete: null,
  selectedDate: '',
  selectedDateTime: '',
  showConfirmation: false,
  isConfirmed: false
};

@userIsAuthenticated
@userHasPermission('schedule')
@firebaseConnect()
@connect(
  ({ firebase }) => ({
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

  handleSetDate = (date) => {
    this.setState({
      selectedDate: date
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

  handleReset = () => {
    this.setState(defaultState);
  };

  render () {
    let { account } = this.props;
    let { selectedAthlete, recurring, selectedDate, selectedDateTime, showAvailableTimes, showDatesModal, showConfirmation, isConfirmed } = this.state;
    let selectedAthleteAccount = selectedAthlete && account.athletes ? _.find(account.athletes, { 'uid': selectedAthlete }) : '';
    let hasChosenType = recurring !== null;

    let assignedAthletes = account.athletes ? account.athletes.map((mentee) => {
      return {
        value: mentee.uid,
        label: `${mentee.firstName ? mentee.firstName : mentee.email} ${mentee.lastName ? mentee.lastName : ''}`
      };
    }) : '';


    if (account.role.name === 'athlete' && !account.mentor) {
      return (
        <div className={classes.container}>
          <h4>You currently don't have a mentor assigned.</h4>
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
            handleRecurring={this.handleRecurring}
            handleSelectedAthlete={this.handleSelectedAthlete}
            assignedAthletes={assignedAthletes}
            selectedAthlete={this.state.selectedAthlete}
            selectedAthleteAccount={selectedAthleteAccount}
            selectedDate={selectedDate}
            onSetDate={this.handleSetDate}
            onSetDateTime={this.handleSetDateTime}
          />

          <MeetingConfirmation
            selectedDateTime={selectedDateTime}
            recurring={recurring}
            selectedAthlete={selectedAthlete}
            isConfirmed={isConfirmed}
            showConfirmation={showConfirmation}
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
