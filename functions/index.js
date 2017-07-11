const functions = require('firebase-functions');
const adminAlertEmail = require('./emails/adminAlert');
const acuity = require('./acuity');
const cors = require('cors')({origin: true});

// Function: send admin alert email
exports.adminAlertEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    adminAlertEmail.send(request.body).then(() => {
      response.status(200).send('success');
    });
  });
});

// Function: get all upcoming appointments
exports.getUpcomingAppointments = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    acuity.getUpcomingAppointments(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: get acuity available dates for calendar
exports.getAvailableDates = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    acuity.getAvailableDates(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: get acuity available times for calendar date
exports.getAvailableTimes = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    acuity.getAvailableTimes(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: create acuity appointment
exports.createAppointment = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    acuity.createAppointment(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});
