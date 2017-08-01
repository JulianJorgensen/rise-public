import moment from 'moment-timezone';

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
