const functions = require('firebase-functions');
const database = require('./firebaseInit').database;
const auth = require('./firebaseInit').auth;

module.exports = {
  deleteUser: function(query) {
    let { uid } = query;
    let userRef = database.ref(`users/${uid}`);

    let deleteUserFromFirebaseAuth = new Promise((resolve, reject) => {
      auth.deleteUser(uid)
        .then(() => {
          resolve(`Successfully deleted user ${uid} from Firebase Auth!`);
        })
        .catch((error) => {
          console.log('Error deleting user from Auth: ', error);
          reject("Error deleting user from Auth.");
        });
    });

    let deleteUserFromFirebaseDatabase = new Promise((resolve, reject) => {
      userRef.remove()
        .then(() => {
          resolve(`Successfully deleted user ${uid} from the Firebase Database!`);
        })
        .catch((error) => {
          reject("Error deleting user from Database:", error);
        });
    });

    return Promise.all([deleteUserFromFirebaseAuth, deleteUserFromFirebaseDatabase])
      .then(() => {
        return `The user ${uid} was successfully removed!`;
      })
      .catch((error) => {
        return `There was an error removing the user ${uid}: ${error}`;
      });
  },

  changeUserStatus: function(query) {
    let { uid, newStatus, newRole } = query;
    let userRef = database.ref(`users/${uid}`);

    return userRef.update({
      applicationApproved: newStatus,
      role: newRole
    })
      .then(() => {
        return `Successfully changed user ${uid}!`;
      })
      .catch((error) => {
        throw error(`Error changed user ${uid} status:`, error);
      });
  }
}
