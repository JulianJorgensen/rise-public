const functions = require('firebase-functions');
const adminAlertEmail = require('./emails/adminAlert');
const cors = require('cors')({origin: true});

// Function: send admin alert email
exports.adminAlertEmail = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    adminAlertEmail.send(request.body).then(() => {
      response.status(200).send('success');
    });
  });
});
