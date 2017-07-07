let Acuity = require('acuityscheduling');
let functions = require('firebase-functions');
let userId = functions.config().acuity.userid;
let apiKey = functions.config().acuity.key;

let acuity = Acuity.basic({
  userId: userId,
  apiKey: apiKey
});

module.exports = {
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
      let {appointmentTypeID, datetime, firstName, lastName, email, phone, calendarID} = query;
      var options = {
        method: 'POST',
        body: {
          appointmentTypeID,
          datetime,
          firstName,
          lastName,
          email,
          phone,
          calendarID
        }
      };
      acuity.request('/appointments', options, function (err, res, appointment) {
        if (err) return console.error(err);
        resolve(appointment);
      });
    });
  }
};
