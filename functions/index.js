const functions = require('firebase-functions');
const adminAlertEmail = require('./emails/adminAlert');
const acuity = require('./acuity');
const stripe = require('./stripe');
const admin = require('./admin');
const cors = require('cors')({origin: true});

// Function: send admin alert email
exports.adminAlertEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    adminAlertEmail.send(request.body).then(() => {
      response.status(200).send('success');
    });
  });
});

// Function: create customer
exports.createStripeCustomer = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    stripe.createCustomer(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: get all cards for a customer
exports.getCards = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    stripe.getCards(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: delete a card from Stripe
exports.deleteCard = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    stripe.deleteCard(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: create charge
exports.createCharge = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    stripe.createCharge(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: create charge
exports.createSubscription = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    stripe.createSubscription(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: get all upcoming meetings based on UID
exports.getMeetingsByUid = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    acuity.getAppointmentsByUid(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: get all upcoming meetings based on mentor UID
exports.getMeetingsByMentorUid = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    acuity.getAppointmentsByMentorUid(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Function: get all upcoming meetings based on UID
exports.getAllMeetings = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    acuity.getAllAppointments(request.query).then((res) => {
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

// Function: create recurring acuity appointments
exports.createRecurringAppointments = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    acuity.createRecurringAppointments(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});


// Admin Function: delete users
exports.deleteUser = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    admin.deleteUser(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});

// Admin Function: change application status
exports.changeApplicationStatus = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    admin.changeApplicationStatus(request.query).then((res) => {
      response.status(200).send(res);
    });
  });
});
