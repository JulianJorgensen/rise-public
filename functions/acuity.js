let functions = require('firebase-functions');
let Acuity = require('acuityscheduling');
let moment = require('moment-timezone');
let userId = functions.config().acuity.userid;
let apiKey = functions.config().acuity.key;


let acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});

// field id in acuity (for unique user id to identify a users appointments etc)
let uidFieldId = 3274695;
let mentorUidFieldId = 3376419;

module.exports = {
  getAppointmentsByUid: function(query) {
    return new Promise(function(resolve, reject) {
      let {max, minDate, maxDate, appointmentTypeID, uid} = query;
      acuity.request(`/appointments?minDate=${minDate}&maxDate=${maxDate}&max=${max}&appointmentTypeID=${appointmentTypeID}&canceled=false&field:${uidFieldId}=${uid}`, function (err, res, appointments) {
        if (err) return console.error(err);
        resolve(appointments);
      });
    });
  },

  getAppointmentsByMentorUid: function(query) {
    return new Promise(function(resolve, reject) {
      let {max, minDate, maxDate, appointmentTypeID, uid} = query;
      acuity.request(`/appointments?minDate=${minDate}&maxDate=${maxDate}&max=${max}&appointmentTypeID=${appointmentTypeID}&canceled=false&field:${mentorUidFieldId}=${uid}`, function (err, res, appointments) {
        if (err) return console.error(err);
        resolve(appointments);
      });
    });
  },

  getAllAppointments: function(query) {
    return new Promise(function(resolve, reject) {
      let {max, minDate, maxDate, appointmentTypeID} = query;
      acuity.request(`/appointments?minDate=${minDate}&maxDate=${maxDate}${max ? `&max=${max}` : ''}&appointmentTypeID=${appointmentTypeID}&canceled=false`, function (err, res, appointments) {
        if (err) return console.error(err);
        resolve(appointments);
      });
    });
  },

  getAvailableDates: function(query) {
    return new Promise(function(resolve, reject){
      let {month, appointmentTypeID, calendarID, timezone} = query;

      acuity.request(`/availability/dates?appointmentTypeID=${appointmentTypeID}&month=${month}&calendarID=${calendarID}&timezone=${timezone}`, function (err, res, availability) {
        if (err) return console.error(err);
        resolve(availability);
      });
    });
  },

  getAvailableTimes: function(query) {
    return new Promise(function(resolve, reject){
      let {date, appointmentTypeID, calendarID, timezone} = query;
      acuity.request(`/availability/times?appointmentTypeID=${appointmentTypeID}&date=${date}&calendarID=${calendarID}&timezone=${timezone}`, function (err, res, availability) {
        if (err) return console.error(err);
        resolve(availability);
      });
    });
  },

  createAppointment: function(query) {
    return new Promise(function(resolve, reject){
      let {appointmentTypeID, datetime, firstName, lastName, email, phone, calendarID, uid, mentorUid} = query;
      let options = {
        method: 'POST',
        body: {
          appointmentTypeID,
          datetime,
          firstName,
          lastName,
          email,
          phone,
          calendarID,
          fields: [
            {id: uidFieldId, value: uid},
            {id: mentorUidFieldId, value: mentorUid},
          ]
        }
      };

      acuity.request('/appointments', options, function (err, res, appointment) {
        if (err) return console.error(err);
        resolve(appointment);
      });
    });
  },

  createRecurringAppointments: function(query) {
    let {appointmentTypeID, recurringDates, datetime, firstName, lastName, email, phone, calendarID, uid, mentorUid} = query;
    let dates = recurringDates.replace(/ /g, '+').split(',');

    let createAppointments = dates.map((datetime) => {
      return new Promise(function(resolve, reject) {
        let options = {
          method: 'POST',
          body: {
            appointmentTypeID,
            datetime,
            firstName,
            lastName,
            email,
            phone,
            calendarID,
            fields: [
              {id: uidFieldId, value: uid},
              {id: mentorUidFieldId, value: mentorUid}
            ]
          }
        };
        acuity.request('/appointments', options, function (err, res, appointment) {
          if (err) reject(err);
          console.log('res data: ', res.data);
          console.log('res body: ', res.body);
          resolve(`Appointment created on ${datetime}`);
        });
      });
    });

    return Promise.all(createAppointments)
      .then(() => {
        return `The recurring appointments have been scheduled for dates: ${dates}...`;
      })
      .catch((err) => {
        return 'There was an error creating recurring appointments...'
      });
  }
};
