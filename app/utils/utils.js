import _ from 'lodash';

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
  let userDetailsForm = _.find(meeting, { 'forms': {'name': 'User Details' }});

  // get the athlete
  let athleteUid = _.find(userDetailsForm, {'values':{'name': 'uid'}});
  athlete = athleteUid ? _.find(users, { 'uid':  athleteUid }).value : defaultAthlete;

  // get the mentor
  let mentorUid = _.find(userDetailsForm, {'values':{'name': 'mentorUid'}});
  mentor = mentorUid ? _.find(users, { 'uid':  mentorUid }).value : defaultMentor;

  return {
    athlete,
    mentor
  }
}
