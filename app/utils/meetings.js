import axios from 'axios';
import _ from 'lodash';
import moment from 'moment-timezone';
import { firebase as fbConfig } from 'app/config';
import { isMentor, isAdmin } from 'utils/utils';

let threeMonthsAgo = moment.tz().subtract(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');
let inThreeMonths = moment.tz().add(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');

export function sortMeetings(meetings, timezone) {
  let now = moment(new Date()).tz(timezone);
  let upcomingMeetings = [];
  let completedMeetings = [];

  meetings.map((meeting, index) => {
    let meetingTime = moment(meeting.datetime, 'YYYY-MM-DDTHH:mm:ssZ');
    if (meetingTime > now) {
      upcomingMeetings.push(meeting);
    }else{
      completedMeetings.push(meeting);
    }
  });

  // sort upcoming meetings ascending
  upcomingMeetings.sort((a, b) => moment(a.datetime, 'YYYY-MM-DDTHH:mm:ssZ') - moment(b.datetime, 'YYYY-MM-DDTHH:mm:ssZ'));

  // sort completed meetings descending
  completedMeetings.sort((a, b) => moment(b.datetime, 'YYYY-MM-DDTHH:mm:ssZ') - moment(a.datetime, 'YYYY-MM-DDTHH:mm:ssZ'));

  return {
    upcomingMeetings,
    completedMeetings
  }
}


export function setUpcomingMeetingNotification(meetings, dispatch) {
  // set notification if meeting is coming up soon
  if (meetingTime.diff(now, 'days') <= 1) {
    let timeFromNow = meetingTime.diff(now, 'hours');
    dispatch({
      type: 'SET_NOTIFICATION',
      message: `You have a meeting in ${timeFromNow} hours!`,
      url: '/video'
    });
  }
}


export const fetchAllMeetings = (account, dispatch) => {
  return axios.get(`${fbConfig.functions}/getAllMeetings`, {
    params: {
      appointmentTypeID: ENV_CONFIG.ACUITY_MENTOR_CALL_ID,
      minDate: threeMonthsAgo,
      maxDate: inThreeMonths,
      max: 100
    }
  })
  .then((response) => {
    let meetings = response.data;

    // sort meetings
    let meetingsSorted = sortMeetings(meetings, account.timezone);

    dispatch({
      type: 'SET_ALL_MEETINGS',
      upcoming: meetingsSorted.upcomingMeetings,
      completed: meetingsSorted.completedMeetings
    });
  })
  .catch((error) => {
    console.log(`Error getting all meetings`, error);
  });
}


export const fetchMeetings = (account, dispatch) => {
  console.log('fetching meetings, with acount', account);
  let { uid, timezone } = account;

  return axios.get(`${fbConfig.functions}/${isMentor(account.role) ? 'getMeetingsByMentorUid' : 'getMeetingsByUid'}`, {
    params: {
      appointmentTypeID: ENV_CONFIG.ACUITY_MENTOR_CALL_ID,
      minDate: threeMonthsAgo,
      maxDate: inThreeMonths,
      max: 100,
      uid: uid
    }
  }).then((response) => {
    let meetings = response.data;

    // sort meetings
    let meetingsSorted = sortMeetings(meetings, timezone);

    // setUpcomingMeetingNotification();

    dispatch({
      type: 'SET_MEETINGS',
      upcoming: meetingsSorted.upcomingMeetings,
      completed: meetingsSorted.completedMeetings
    });

    dispatch({
      type: 'MEETINGS_NEEDS_UPDATE',
      state: false
    });
  });
};


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
  let appMetaForm = _.find(meeting.forms, { 'name': 'App Meta' });

  if (!appMetaForm) {
    return {
      athlete,
      mentor
    }
  }

  // get the athlete
  let athleteUid = _.find(appMetaForm.values, {'name': 'uid'});
  let athleteObj = _.find(users, { 'uid':  athleteUid });
  athlete = athleteObj ? athleteObj.value : defaultAthlete;

  // get the mentor
  let mentorUid = _.find(appMetaForm.values, {'name': 'mentorUid'});
  let mentorObj = _.find(users, { 'uid':  mentorUid });
  mentor = mentorObj ? mentorObj.value : defaultMentor;

  return {
    athlete,
    mentor
  }
}


export function checkIfMeetingIsCompleted(meeting) {
  let appMetaForm = _.find(meeting.forms, { 'name': 'App Meta' });

  if (!appMetaForm) {
    return false;
  }

  if (!appMetaForm.values) {
    return false;
  }

  let appMetaFormCompleted = _.find(appMetaForm.values, { 'name': 'completed' });

  if (!appMetaFormCompleted) {
    return false;
  }

  let isCompleted = appMetaFormCompleted.value === 'yes' ? true : false;
  return isCompleted;
}
