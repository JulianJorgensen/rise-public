const functions = require('firebase-functions');
const database = require('./firebaseInit').database;
const auth = require('./firebaseInit').auth;
const _ = require('lodash');

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

  changeApplicationStatus: function(query) {
    let { uid, newStatus, newRole } = query;
    let userRef = database.ref(`users/${uid}`);
    console.log('chaning status');

    return new Promise((resolve, reject) => {
      userRef.update({
        applicationApproved: (newStatus === 'true')
      })
        .then(() => {
          console.log('changed status!!;;');
          resolve(`Successfully changed application status for user ${uid} to ${newStatus}`);
        })
        .catch((error) => {
          reject(`Error changing application status for user ${uid}, error:`, error);
        });  
    });
  },

  pairAthleteWithMentor: function(query) {
    let { athleteUid, mentorUid } = query;

    let updateOldMentor = () => {
      return new Promise((resolve, reject) => {
        let athleteRef = database.ref(`users/${athleteUid}`);

        athleteRef.once("value", (snapshot) => {
          let athleteId = snapshot.val().uid;
          let oldMentorUid = snapshot.val().mentor;
          let oldMentorAthletesRef = database.ref(`users/${oldMentorUid}/athletes`);
          oldMentorAthletesRef.orderByValue().equalTo(athleteId).once("value", (athleteSnapshot) => {
            athleteSnapshot.forEach((data) => {
              oldMentorAthletesRef.child(data.key).remove();
              resolve();
            });
          }).then(() => {
            resolve();
          });
        }).catch((error) => {
          reject(error);
        });
      });
    };

    let updateAthlete = () => {
      return new Promise((resolve, reject) => {
        let athleteRef = database.ref(`users/${athleteUid}`);
        athleteRef.update({
          mentor: mentorUid
        }).then((res) => {
          resolve(res);
        }).catch((error) => {
          reject(error);
        });
      });
    };

    let updateMentor = () => {
      return new Promise((resolve, reject) => {
        let mentorAthletesRef = database.ref(`users/${mentorUid}/athletes`);
        mentorAthletesRef.once("value", (snapshot) => {
          let athletesArr = snapshot.val() ? Object.values(snapshot.val()) : [];
          let athleteExists = athletesArr.indexOf(athleteUid) !== -1;

          if (!athleteExists) {
            mentorAthletesRef.update({
              [athleteUid]: athleteUid
            }).then((res) => {
              resolve(res);
            }).catch((error) => {
              reject(error);
            });
          } else {
            resolve('athlete already added to mentor athletes list!');
          }
        }).catch((err) => {
          reject(err);
        });
      });
    };

    return updateOldMentor()
      .then(updateAthlete)
      .then(updateMentor)
  }
}
