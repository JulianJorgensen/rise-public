import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, populatedDataToJS } from 'react-redux-firebase';
import { firebase as fbConfig, reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import axios from 'axios';
import moment from 'moment-timezone';
import {Checkbox, Chip, DatePicker, Dropdown, Dialog, Input, List, ListItem} from 'react-toolbox/lib';
import TimezoneSelector from './components/TimezoneSelector';
import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

let availableDates = [
  moment("2017-07-20", "YYYY-MM-DD").toDate(),
  moment("2017-07-21", "YYYY-MM-DD").toDate(),
  moment("2017-07-22", "YYYY-MM-DD").toDate(),
  moment("2017-07-23", "YYYY-MM-DD").toDate(),
  moment("2017-07-24", "YYYY-MM-DD").toDate(),
  moment("2017-07-25", "YYYY-MM-DD").toDate()
]

let today = moment(new Date());
const MAX_MONTHS_IN_ADVANCE = 3;
const ACUITY_MENTOR_CALL_ID = 346940;
const RECURRING_WEEKS = 14;

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
    let {mentor} = this.props.account;
    let {timezone} = this.props;
    // get available dates
    axios.get(`${fbConfig.functions}/getAvailableDates`, {
      params: {
        month: month,
        appointmentTypeID: ACUITY_MENTOR_CALL_ID,
        calendarID: mentor.acuityCalendarId,
        timezone: timezone
      }
    })
    .then((response) => {
      let availableDates = response.data;
      this.setState({availableDates: this.state.availableDates.push(availableDates)}, () => {
        console.log('updated new available dates: ', this.state);
      });
    })
    .catch((error) => {
      console.log(`Error getting available dates`, error);
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
    }, () => {
      console.log('handleShowDates');
      console.log('state: ', this.state);
    })
  };

  showAvailableTimes = () => {
    let {selectedDate} = this.state;
    let {timezone, mentor} = this.props.account;

    if (!selectedDate){
      this.setState({
        showDatesModal: true,
        showTimesModal: false
      });
    }else{
      // get available times for selected date
      axios.get(`${fbConfig.functions}/getAvailableTimes`, {
        params: {
          date: moment(selectedDate).format('YYYY-MM-DD'),
          appointmentTypeID: ACUITY_MENTOR_CALL_ID,
          calendarID: mentor.acuityCalendarId,
          timezone: timezone
        }
      })
      .then((response) => {
        let availableTimes = response.data;
        console.log(fbConfig.functions);
        console.log('available times: ', response.data);
        availableTimes.sort((a,b) => {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.time) - new Date(b.time);
        });
        this.setState({
          availableTimes,
          availableTimesFetched: true
        });
      })
      .catch((error) => {
        console.log(`Error getting available times for date: ${selectedDate}`, error);
      });

      this.setState({showTimesModal: true});
    }
  }

  confirmMeeting = () => {
    let { account } = this.props;
    let { selectedAthlete, recurring, selectedDate, selectedTime } = this.state;
    let recurringDates = [];

    this.setState({
      isConfirming: true
    });

    if (recurring){
      // add the formatted date for each week (formatted for acuity)
      for (let i=0; i < RECURRING_WEEKS; i++) {
        recurringDates.push(moment(selectedDate).add(i, 'weeks').format('YYYY-MM-DD') + moment(selectedTime).tz(account.timezone).format('THH:mmZ'));
      }

      recurringDates = recurringDates.join(',');
    }

    // create appointment
    axios.get(`${fbConfig.functions}/${recurring ? 'createRecurringAppointments' : 'createAppointment'}`, {
      params: {
        datetime: `${moment(selectedDate).format('YYYY-MM-DD')}${moment(selectedTime).tz(account.timezone).format('THH:mmZ')}`,
        appointmentTypeID: ACUITY_MENTOR_CALL_ID,
        calendarID: account.mentor.acuityCalendarId,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        phone: account.phone,
        uid: selectedAthlete ? selectedAthlete.uid : account.uid,
        recurringDates: recurring ? recurringDates : null
      }
    })
    .then((response) => {
      let confirmation = response.data;
      console.log('confirmed! ', confirmation);
      this.setState({
        isConfirming: false,
        isConfirmed: true,
        showConfirmationModal: false,
        location: confirmation.location
      });
    })
    .catch((error) => {
      console.log(`Error confirming appointment`, error);
    });
  }

  componentWillMount(){
    // let nextMonth = today.add(1, 'M');
    // let in2Months = today.add(2, 'M');
    // this.getAvailableDates(today.format('YYYY-MM'));
    // this.getAvailableDates(nextMonth.format('YYYY-MM'));
    // this.getAvailableDates(nextMonth.format('YYYY-MM'));
  }

  render () {
    let { account } = this.props;
    let { selectedAthlete, recurring, selectedDate, selectedTime, showTimesModal, showDatesModal, showConfirmationModal, availableTimes, availableTimesFetched, isConfirmed, isConfirming, location } = this.state;

    let renderAssignAthlete = () => {
      let assignedAthletes = account.mentees.map((mentee) => {
        return {
          value: mentee,
          label: `${mentee.firstName ? mentee.firstName : mentee.email} ${mentee.lastName ? mentee.lastName : ''}`
        };
      });
      return (
        <Dropdown
          auto
          onChange={this.handleSelectedAthlete}
          source={assignedAthletes}
          value={this.state.selectedAthlete}
          label="Athlete"
          required
        />
      )
    }

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

    if (account){
      if (account.mentor){
        if (isConfirmed){
          return (
            <div className={`${classes.container} ${classes.success}`}>
              <h1 className={classes.header}>Congratulations!</h1>
              <p>You're now scheduled for {recurring ? 'recurring sessions' : 'a session'} with {account.mentor.firstName} {recurring ? 'starting on' : 'on'}:</p>
              <div className={classes.confirmationDetails}>
                <div className={classes.time}>
                  <div className={classes.time}><strong>{moment(selectedDate).format('MMMM Do YYYY')}</strong> at <strong>{moment(selectedTime).format('h:mma')}</strong></div>
                </div>
              </div>
              <Button
                label="Schedule another session"
                onClick={() => this.setState({confirmed: false})}
              />
            </div>
          )
        }else if (recurring !== null){
          return (
            <div className={classes.container}>
              <h2>Scheduling {recurring ? `${RECURRING_WEEKS} recurring sessions` : 'a single session'} with your {account.role.name === 'mentor' ? `athlete ${ selectedAthlete ? selectedAthlete.firstName : '' }` : `mentor ${account.mentor.firstName}`}</h2>

              <form onSubmit={this.handleConfirmation} className={classes.scheduleForm}>
                { account.role.name === 'mentor' ? renderAssignAthlete() : '' }

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
                    enabledDates={availableDates}
                    required
                  />

                  <Input
                    type='text'
                    label='Time'
                    name='time'
                    value={selectedTime ? moment(selectedTime).format('h:mma') : ''}
                    onClick={this.showAvailableTimes.bind(this)}
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
                title={`Confirm your session with ${selectedAthlete ? selectedAthlete.firstName : account.mentor.firstName}`}
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
            <div className={classes.container}>
              <h2>Which kind of session would you like to schedule?</h2>
              <div className={classes.scheduleType}>
                <div
                  className={classes.single}
                  onClick={() => this.handleRecurring(false)}
                >
                  <h3>Single session</h3>
                </div>
                <div
                  className={classes.recurring}
                  onClick={() => this.handleRecurring(true)}
                >
                  <h3>Recurring</h3>
                  <small>(season of {RECURRING_WEEKS} sessions)</small>
                </div>
              </div>
            </div>
          )
        }
      }else{
        return (
          <div className={classes.container}>
            <h2>You currently don't have a mentor assigned.</h2>
          </div>
        )
      }
    }else{
      return (
        <LoadingSpinner />
      )
    }
  }
}
