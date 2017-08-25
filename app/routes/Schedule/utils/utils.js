import axios from 'axios';
import moment from 'moment-timezone';
import _ from 'lodash';
import { firebase as fbConfig, reduxFirebase as rfConfig } from 'app/config';
import { isMentor, isAdmin } from 'utils/utils';

const ACUITY_MENTOR_CALL_ID = ENV_CONFIG.ACUITY_MENTOR_CALL_ID;
const RECURRING_WEEKS = ENV_CONFIG.RECURRING_WEEKS;

export function fetchAvailableDates(month, acuityCalendarId, timezone) {
  return new Promise((resolve, reject) => {
    axios.get(`${fbConfig.functions}/getAvailableDates`, {
      params: {
        month: month,
        appointmentTypeID: ACUITY_MENTOR_CALL_ID,
        calendarID: acuityCalendarId,
        timezone: timezone
      }
    })
    .then((response) => {
      let availableDatesObj = response.data;
      let availableDates = [...this.state.availableDates];

      availableDatesObj.map((obj) => {
        availableDates.push(moment(obj.date, "YYYY-MM-DD").toDate());
      });

      resolve(availableDates);
    })
    .catch((error) => {
      reject(`Error getting available dates`, error);
    });
  });
};


export function fetchAvailableTimes(date, acuityCalendarId, timezone) {
  return new Promise((resolve, reject) => {
    // get available times for selected date
    axios.get(`${fbConfig.functions}/getAvailableTimes`, {
      params: {
        date: moment(date).format('YYYY-MM-DD'),
        appointmentTypeID: ACUITY_MENTOR_CALL_ID,
        calendarID: acuityCalendarId,
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

      resolve(availableTimes);
    })
    .catch((error) => {
      reject(`Error getting available times for date: ${date}`, error);
    });
  });
};



export function confirmMeeting(selectedAthlete, dateTime, account, recurring, dispatch) {
  return new Promise((resolve, reject) => {
    let acuityCalendarId = isMentor(account.role) ? account.acuityCalendarId : account.mentor.acuityCalendarId;

    // If recurirng
    // ================
    let recurringDates = [];
    if (recurring){
      // add the formatted date for each week (formatted for acuity)
      for (let i=0; i < RECURRING_WEEKS; i++) {
        recurringDates.push(moment(selectedDateTime).add(i, 'weeks').tz(account.timezone).format('YYYY-MM-DDTHH:mmZ'));
      }

      recurringDates = recurringDates.join(',');
    }


    // Create appointment
    // ======================
    axios.get(`${fbConfig.functions}/${recurring ? 'createRecurringAppointments' : 'createAppointment'}`, {
      params: {
        datetime: `${moment(dateTime).tz(account.timezone).format('YYYY-MM-DDTHH:mmZ')}`,
        appointmentTypeID: ACUITY_MENTOR_CALL_ID,
        calendarID: acuityCalendarId,
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        phone: account.phone,
        uid: selectedAthlete ? selectedAthlete : account.uid,
        mentorUid: isMentor(account.role) ? account.uid : account.mentor.uid,
        recurringDates: recurring ? recurringDates : null
      }
    })
    .then((response) => {
      let confirmation = response.data;
      if (confirmation.error) {
        console.log('error creating appointment', confirmation.error);
        dispatch({
          type: 'SET_SNACKBAR',
          message: `There was an error creating the appointment: ${confirmation.message}`,
          style: 'error'
        });
      }else{
        resolve(confirmation);

        // update redux connected meetings
        dispatch({
          type: 'MEETINGS_NEEDS_UPDATE',
          state: true
        });
      }
    })
    .catch((error) => {
      console.log(`Error confirming appointment`, error);
    });
  });
};


export function rescheduleMeeting(id, dateTime, timezone) {
  return new Promise((resolve, reject) => {
    console.log('===reschedulign to', dateTime);
    console.log('formatted', moment(dateTime).tz(timezone).format('YYYY-MM-DDTHH:mmZ'));
    console.log('timezone', timezone);
    axios.get(`${fbConfig.functions}/rescheduleAppointment`, {
      params: {
        id: id,
        datetime: dateTime,
        timezone: timezone
      }
    })
    .then((response) => {
      let confirmation = response.data;
      resolve(confirmation);
    })
    .catch((error) => {
      reject('Error rescheduling meeting', error);
    });
  });
};
