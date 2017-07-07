import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { UserIsAuthenticated, UserHasPermission } from 'utils/router'
import axios from 'axios';
import moment from 'moment-timezone';
import {Chip, DatePicker, Dropdown, Dialog, Input, List, ListItem} from 'react-toolbox/lib';
import TimezoneSelector from '../components/TimezoneSelector';
import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './ScheduleContainer.css';
import buttons from 'styles/buttons.css';

let availableDates = [
  moment("2017-07-07", "YYYY-MM-DD").toDate(),
  moment("2017-07-08", "YYYY-MM-DD").toDate(),
  moment("2017-07-09", "YYYY-MM-DD").toDate(),
  moment("2017-07-10", "YYYY-MM-DD").toDate(),
  moment("2017-07-11", "YYYY-MM-DD").toDate(),
  moment("2017-07-12", "YYYY-MM-DD").toDate(),
  moment("2017-07-13", "YYYY-MM-DD").toDate()
]

let today = moment(new Date());
const MAX_MONTHS_IN_ADVANCE = 3;
const ACUITY_MENTOR_CALL_ID = 346940;

@UserIsAuthenticated // redirect to /login if user is not authenticated
@UserHasPermission('schedule')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Schedule extends Component {
  state = {
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

  getAvailableDates = (month) => {
    let {mentor} = this.props.account;
    let {timezone} = this.props;
    // get available dates
    axios.get('http://localhost:5002/rise-1602c/us-central1/getAvailableDates', {
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
    // get available times for selected date
    axios.get('http://localhost:5002/rise-1602c/us-central1/getAvailableTimes', {
      params: {
        date: moment(selectedDate).format('YYYY-MM-DD'),
        appointmentTypeID: ACUITY_MENTOR_CALL_ID,
        calendarID: mentor.acuityCalendarId,
        timezone: timezone
      }
    })
    .then((response) => {
      let availableTimes = response.data;
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

  confirmMeeting = () => {
    let {account} = this.props;
    let {selectedDate, selectedTime} = this.state;

    this.setState({
      isConfirming: true
    });

    // create appointment
    axios.get('http://localhost:5002/rise-1602c/us-central1/createAppointment', {
      params: {
        datetime: `${moment(selectedDate).format('YYYY-MM-DD')}${moment(selectedTime).tz(account.timezone).format('THH:mmZ')}`,
        appointmentTypeID: ACUITY_MENTOR_CALL_ID,
        calendarID: account.mentor.acuityCalendarId,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        phone: account.phone
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
    let {account} = this.props;
    let {selectedDate, selectedTime, showTimesModal, showDatesModal, showConfirmationModal, availableTimes, availableTimesFetched, isConfirmed, isConfirming, location} = this.state;

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

    if (isConfirmed){
      return (
        <div className={`${classes.container} ${classes.success}`}>
          <h1 className={classes.header}>Congratulations!</h1>
          <p>You're now scheduled for a session with {account.mentor.firstName} on:</p>
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
    }else{
      return (
        <div className={classes.container}>
          <h2>Schedule a session with your mentor {account.mentor.firstName}</h2>

          <form onSubmit={this.handleConfirmation} className={classes.scheduleForm}>
            <div className={classes.dateTimeFields}>
              <DatePicker
                active={showDatesModal}
                onDismiss={() => this.setState({showDatesModal: false})}
                label='Date'
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

            <Button
              type="submit"
              label='Schedule session'
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
            title={`Confirm your session with ${account.mentor.firstName}`}
          >
            <div className={classes.confirmationDetails}>
              <div className={classes.time}><strong>{moment(selectedDate).format('MMMM Do YYYY')}</strong> at <strong>{moment(selectedTime).format('h:mma')}</strong></div>
              <TimezoneSelector />
            </div>
          </Dialog>
        </div>
      )
    }
  }
}
