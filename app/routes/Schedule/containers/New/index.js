import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, populatedDataToJS } from 'react-redux-firebase';
import { firebase as fbConfig, reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import axios from 'axios';
import moment from 'moment-timezone';
import _ from 'lodash';
import { isMentor, isAdmin } from 'utils/utils';
import {Checkbox, Chip, DatePicker, Dropdown, Dialog, Input, List, ListItem} from 'react-toolbox/lib';
import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

import TimezoneSelector from '../../components/TimezoneSelector';

import ChooseType from './components/ChooseType';
import AssignAthlete from './components/AssignAthlete';

import * as utils from '../utils/utils';

const MAX_MONTHS_IN_ADVANCE = 3;
const ACUITY_MENTOR_CALL_ID = ENV_CONFIG.ACUITY_MENTOR_CALL_ID;
const RECURRING_WEEKS = ENV_CONFIG.RECURRING_WEEKS;

@userIsAuthenticated
@userHasPermission('schedule')
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Schedule extends Component {
  state = {
    selectedAthlete: null,
    recurring: null,
    selectedDate: '',
    showDatesModal: false,
    showTimesModal: false,
    showConfirmationModal: false,
    availableDates: [],
    availableTimes: [],
    availableTimesFetched: false,
    selectedTime: '',
    isConfirmed: false,
    isConfirming: false,
    location: ''
  };

  handleSelectedAthlete = (selectedAthlete) => {
    this.setState({ selectedAthlete });
  }

  handleRecurring = (value) => {
    this.setState({
      recurring: value
    });
  }

  getAvailableDates = (month) => {
    let { mentor, timezone } = this.props.account;
    utils.getAvailableDates(month, mentor.acuityCalendarId, timezone).then((availableDates) => {
      this.setState({ availableDates: availableDates });
    });
  }

  handleDateChange = (selectedDate) => {
    this.setState({selectedDate}, () => {

      // get available times for date
      this.showAvailableTimes();

      // reset state
      this.setState({
        showDatesModal: false,
        availableTimes: [],
        availableTimesFetched: false,
        selectedTime: '1'
      });
    });
  };

  handleTimeChange = (selectedTime) => {
    this.setState({selectedTime});
  };

  handleConfirmation = (event) => {
    event.preventDefault();
    this.setState({showConfirmationModal: true});
  };

  handleHideConfirmationModal = () => {
    this.setState({showConfirmationModal: false});
  };

  handleShowDates = () => {
    this.setState({
      showDatesModal: true,
      showTimesModal: false
    });
  };

  showAvailableTimes = () => {
    let { account } = this.props;
    let { mentor, timezone, role } = account;
    let { selectedDate } = this.state;

    let acuityCalendarId = isMentor(role) ? account.acuityCalendarId : mentor.acuityCalendarId;

    this.setState({
      showTimesModal: true
    });

    if (!selectedDate){
      this.setState({
        showDatesModal: true,
        showTimesModal: false
      });
    }else{
      utils.showAvailableTimes(selectedDate, acuityCalendarId, timezone).then((availableTimes) => {
        this.setState({
          availableTimes,
          availableTimesFetched: true
        });
      });
    }
  }

  confirmMeeting = () => {
    let { account, dispatch } = this.props;
    let { selectedAthlete, recurring, selectedDate, selectedTime } = this.state;

    this.setState({
      isConfirming: true
    });

    utils.confirmMeeting(
      selectedAthlete,
      selectedDate,
      selectedTime,
      account,
      recurring,
      dispatch
    ).then((confirmation) => {
      this.setState({
        isConfirming: false,
        isConfirmed: true,
        showConfirmationModal: false,
        location: confirmation.location
      });
    });
  }

  render () {
    let { account } = this.props;
    let { selectedAthlete, recurring, selectedDate, selectedTime, showTimesModal, showDatesModal, showConfirmationModal, availableTimes, availableTimesFetched, isConfirmed, isConfirming, location } = this.state;
    let selectedAthleteAccount = selectedAthlete && account.athletes ? _.find(account.athletes, { 'uid': selectedAthlete }) : '';

    let assignedAthletes = account.athletes ? account.athletes.map((mentee) => {
      return {
        value: mentee.uid,
        label: `${mentee.firstName ? mentee.firstName : mentee.email} ${mentee.lastName ? mentee.lastName : ''}`
      };
    }) : '';


    let renderAvailableTimes = () => {
      if (availableTimes.length > 0) {
        return (
          <div>
            <div className={classes.times}>
              {availableTimes.map((item, index) => {
                return (
                  <Chip
                    key={index}
                    className={classes.time}
                    onClick={() => {
                      this.setState({
                        selectedTime: item.time,
                        showDatesModal: false,
                        showTimesModal: false
                      })
                    }}
                  >{moment(item.time).format('h:mma')}</Chip>
                )
              })}
            </div>
            <TimezoneSelector changeable />
          </div>
        )
      }else{
        return (
          <div>Sorry, there are no more available times for this day.</div>
        )
      }
    }

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

    if (isConfirmed) {
      let firstName = isMentor(account.role) ? selectedAthleteAccount.firstName : account.mentor.firstName;

      return (
        <div className={`${classes.container} ${classes.success}`}>
          <h2 className={classes.header}>Congratulations!</h2>
          <p>You're now scheduled for {recurring ? 'recurring sessions' : 'a session'} with {firstName} {recurring ? 'starting on' : 'on'}:</p>
          <div className={classes.confirmationDetails}>
            <div className={classes.time}>
              <div className={classes.time}><strong>{moment(selectedDate).format('MMMM Do YYYY')}</strong> at <strong>{moment(selectedTime).format('h:mma')}</strong></div>
            </div>
          </div>
          <Button
            label="Schedule another session"
            onClick={() => this.setState({
              isConfirmed: false,
              recurring: null
            })}
          />
        </div>
      )
    }else if (recurring !== null){
      return (
        <div className={classes.container}>
          <h2>Scheduling {recurring ? `${RECURRING_WEEKS} recurring sessions` : 'a single session'} with your {isMentor(account.role) ? `athlete ${ selectedAthlete ? selectedAthleteAccount.firstName : '' }` : `mentor ${account.mentor.firstName}`}</h2>

          <form onSubmit={this.handleConfirmation} className={classes.scheduleForm}>

            { isMentor(account.role) ?
              <AssignAthlete
                handleSelectedAthlete={this.handleSelectedAthlete}
                assignedAthletes={assignedAthletes}
                selectedAthlete={this.state.selectedAthlete}
              /> : '' }

            <div className={classes.dateTimeFields}>
              <DatePicker
                active={showDatesModal}
                onDismiss={() => this.setState({showDatesModal: false})}
                label={recurring ? 'Start Date' : 'Date'}
                sundayFirstDayOfWeek
                onChange={this.handleDateChange.bind(this)}
                value={selectedDate}
                // minDate={today}
                // maxDate={today.add(MAX_MONTHS_IN_ADVANCE, 'M')}
                autoOk={true}
                enabledDates={this.state.availableDates}
                required
              />

              <Input
                type='text'
                label='Time'
                name='time'
                value={selectedTime ? moment(selectedTime).format('h:mma') : ''}
                onClick={() => this.showAvailableTimes.bind(this)}
                required
              />
            </div>

            <TimezoneSelector changeable />

            <Checkbox
              label="Recurring"
              checked={recurring}
              onChange={this.handleRecurring.bind(this)}
            />

            <Button
              type="submit"
              label={`Schedule session${recurring ? 's' : ''}`}
            />
          </form>

          <Dialog
            actions={[
              { label: "Choose another day", onClick: this.handleShowDates }
            ]}
            active={showTimesModal}
            onEscKeyDown={this.handleShowDates}
            onOverlayClick={this.handleShowDates}
            title={`Available Times for ${moment(selectedDate).format('MMMM Do YYYY')}`}
          >
            {availableTimesFetched ? renderAvailableTimes() : <LoadingSpinner />}
          </Dialog>

          <Dialog
            actions={[
              {
                icon: isConfirming ? <i className="fa fa-spinner fa-pulse fa-fw" /> : null,
                label: `Schedule session`,
                onClick: this.confirmMeeting,
                primary: true,
                className: `${classes.confirmButton} ${classes.button}`,
                disabled: isConfirming ? true : false
              }
            ]}
            active={showConfirmationModal}
            onEscKeyDown={this.handleHideConfirmationModal}
            onOverlayClick={this.handleHideConfirmationModal}
            title={`Confirm your session with ${selectedAthlete ? selectedAthleteAccount.firstName : account.mentor.firstName}`}
          >
            <div className={classes.confirmationDetails}>
              <div className={classes.time}><strong>{moment(selectedDate).format('MMMM Do YYYY')}</strong> at <strong>{moment(selectedTime).format('h:mma')}</strong></div>
              <TimezoneSelector />
            </div>
          </Dialog>
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
