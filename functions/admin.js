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

    return userRef.update({
      applicationApproved: (newStatus === 'true')
    })
      .then(() => {
        return `Successfully changed application status for user ${uid} to ${newStatus}`;
      })
      .catch((error) => {
        throw error(`Error changing application status for user ${uid}, error:`, error);
      });
  },

  pairAthleteWithMentor: function(query) {
    let { athleteUid, mentorUid } = query;

    let updateOldMentor = () => {
      return new Promise((resolve, reject) => {
        let athleteRef = database.ref(`users/${athleteUid}`);

        athleteRef.once("value", (snapshot) => {
          let oldMentorUid = snapshot.val().mentor;
          let oldMentorAthletesRef = database.ref(`users/${oldMentorUid}/athletes`);

          console.log('oldMentorUid', oldMentorUid);

          oldMentorAthletesRef.once("value", (snapshot) => {
            console.log('oldMentorAthletes', snapshot.val());
            let updates = {};
            snapshot.forEach(child => updates[child.key] = null);
            oldMentorAthletesRef.update(updates).then(() => {
              resolve(`Deleted refs from the old mentor ${oldMentorUid}`);
            });
          }).catch((error) => {
            reject(error);
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
              [athletesArr.length]: athleteUid
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
