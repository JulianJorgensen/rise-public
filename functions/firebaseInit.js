const functions = require('firebase-functions');
const fbAdmin = require('firebase-admin');

// initialize Firebase
fbAdmin.initializeApp(functions.config().firebase); // firebase is autopopulated when deploying using Firebase CLI

// exports
module.exports = {
  auth: fbAdmin.auth(),
  database: fbAdmin.database()
}
