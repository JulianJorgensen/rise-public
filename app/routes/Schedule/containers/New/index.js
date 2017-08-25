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

import * as utils from '../../utils/utils';

const defaultState = {
  selectedAthlete: null,
  recurring: null,
  selectedDate: '',
  showDatesModal: false,
  showAvailableTimes: false,
  showConfirmation: false,
  selectedTime: '',
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

  handleRecurring = (value) => {
    this.setState({
      recurring: value
    });
  }

  handleDateChange = (selectedDate) => {
    this.setState({
      selectedDate
    }, () => {
      this.setState({
        showAvailableTimes: true,
        showDatesModal: false,
        availableTimes: [],
        availableTimesFetched: false,
        selectedTime: ''
      });
    });
  };

  handleTimeChange = (selectedTime) => {
    this.setState({
      selectedTime
    });
  };

  handleConfirmation = (event) => {
    event.preventDefault();
    this.setState({
      showConfirmation: true
    });
  };

  handleHideConfirmationModal = () => {
    this.setState({
      showConfirmation: false
    });
  };

  handleShowDates = () => {
    this.setState({
      showDatesModal: true,
      showAvailableTimes: false
    });
  };

  handleShowTimes = () => {
    this.setState({
      showDatesModal: false,
      showAvailableTimes: true
    });
  };

  handleReset = () => {
    this.setState(defaultState);
  };

  render () {
    let { account } = this.props;
    let { selectedAthlete, recurring, selectedDate, selectedTime, showAvailableTimes, showDatesModal, showConfirmation, isConfirmed } = this.state;
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
            handleSelectedAthlete={this.handleSelectedAthlete}
            assignedAthletes={assignedAthletes}
            selectedAthlete={this.state.selectedAthlete}
            selectedAthleteAccount={selectedAthleteAccount}
            showDatesModal={showDatesModal}
            onDatesDismiss={() => this.setState({showDatesModal: false})}
            onDateChange={this.handleDateChange}
            recurring={recurring}
            selectedDate={selectedDate}
            onTimeClick={this.handleShowTimes}
            handleRecurring={this.handleRecurring}
            showAvailableTimes={showAvailableTimes}
            handleCloseAvailableTimes={this.handleShowDates}
            selectedTime={selectedTime}
            handleSelectTime={(time) => {
              this.setState({
                selectedTime: time,
                showAvailableTimes: false
              })
            }}
          />

          <MeetingConfirmation
            selectedDate={selectedDate}
            selectedTime={selectedTime}
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
