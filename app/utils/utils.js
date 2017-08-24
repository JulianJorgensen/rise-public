import _ from 'lodash';
import { reduxFirebase as rfConfig } from 'app/config';

export function updateAccount(firebase, uid, newData) {
  return firebase.update(`${rfConfig.userProfile}/${uid}`, newData).then((res) => {
  }).catch((err) => {
    console.error('Error updating account', err);
  });
}

export function toObject(arr) {
  let object = {};
  arr.map((item) => {
    object[item[0]] = item[1];
  })
  return object;
}

export function isMentor(role) {
  if (role.name === 'mentor' || role.name === 'admin') {
    return true;
  }
  return false;
}

export function isAdmin(role) {
  if (role.name === 'admin') {
    return true;
  }
  return false;
}

export function getAttendeesFromMeeting(meeting, users) {
  let athlete, mentor;

  let defaultAthlete = {
    firstName: meeting.firstName,
    lastName: meeting.lastName
  }
  let defaultMentor = {
    firstName: meeting.calendar.split(' ')[0],
    lastName: meeting.calendar.split(' ')[1]
  }

  if (!meeting.forms.length > 0){
    return {
      athlete: defaultAthlete,
      mentor: defaultMentor
    }
  }

  // get the form on acuity with all the user details
  let appMetaForm = _.find(meeting, { 'forms': {'name': 'App Meta' }});

  // get the athlete
  let athleteUid = _.find(appMetaForm, {'values':{'name': 'uid'}});
  athlete = athleteUid ? _.find(users, { 'uid':  athleteUid }).value : defaultAthlete;

  // get the mentor
  let mentorUid = _.find(appMetaForm, {'values':{'name': 'mentorUid'}});
  mentor = mentorUid ? _.find(users, { 'uid':  mentorUid }).value : defaultMentor;

  return {
    athlete,
    mentor
  }
}

export function removePopulatedData(data) {
  let filteredData = Object.entries(data).filter(([key, value]) => {
    return typeof value !== 'object' && typeof value !== 'undefined';
  });
  return toObject(filteredData);
}
