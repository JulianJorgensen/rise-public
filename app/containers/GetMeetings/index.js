import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';

@firebaseConnect()
@connect(
  ({ notification, firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
    notification
  })
)
export default class MeetingsMentor extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  state = {
    meetingsFetched: false,
    allMeetingsFetched: false
  }

  sortMeetings = (meetings) => {
    let { timezone } = this.props.account;
    let now = moment(new Date()).tz(timezone);
    let upcomingMeetings = [];
    let completedMeetings = [];

    meetings.map((meeting, index) => {
      let meetingTime = moment(meeting.datetime, 'YYYY-MM-DDTHH:mm:ssZ');
      if (meetingTime > now) {
        upcomingMeetings.push(meeting);

        // set notification if meeting is coming up soon
        if (meetingTime.diff(now, 'days') <= 1) {
          let timeFromNow = meetingTime.diff(now, 'hours');
          this.props.dispatch({
            type: 'SET_NOTIFICATION',
            message: `You have a meeting in ${timeFromNow} hours!`,
            url: '/video'
          });
        }
      }else{
        completedMeetings.push(meeting);
      }
    });

    return {
      upcomingMeetings,
      completedMeetings
    }
  }

  getMeetings = () => {
    let { uid, mentor, timezone } = this.props.account;
    let threeMonthsAgo = moment.tz(timezone).subtract(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');
    let inThreeMonths = moment.tz(timezone).add(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');

    axios.get(`${fbConfig.functions}/getMeetingsByUid`, {
      params: {
        appointmentTypeID: ENV_CONFIG.ACUITY_MENTOR_CALL_ID,
        minDate: threeMonthsAgo,
        maxDate: inThreeMonths,
        max: 100,
        uid: uid
      }
    })
    .then((response) => {
      let meetings = response.data;

      // sort meetings
      let meetingsSorted = this.sortMeetings(meetings);

      this.props.dispatch({
        type: 'SET_MEETINGS',
        upcomingMeetings: meetingsSorted.upcomingMeetings,
        completedMeetings: meetingsSorted.upcomingMeetings
      });
    })
    .catch((error) => {
      console.log(`Error getting meetings`, error);
    });

    this.setState({
      meetingsFetched: true
    });
  }

  getAllMeetings = () => {
    let { timezone } = this.props.account;
    let threeMonthsAgo = moment.tz().subtract(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');
    let inThreeMonths = moment.tz().add(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');

    axios.get(`${fbConfig.functions}/getAllMeetings`, {
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
      let meetingsSorted = this.sortMeetings(meetings);

      console.log('got all meetings: ', meetingsSorted);

      this.props.dispatch({
        type: 'SET_ALL_MEETINGS',
        upcomingMeetings: meetingsSorted.upcomingMeetings,
        completedMeetings: meetingsSorted.upcomingMeetings
      });
    })
    .catch((error) => {
      console.log(`Error getting all meetings`, error);
    });

    this.setState({
      allMeetingsFetched: true
    });
  }

  render () {
    let { account } = this.props;
    let { meetingsFetched, allMeetingsFetched } = this.state;
    let isAdmin = !isEmpty(account) && isLoaded(account) ? account.role.name === 'admin' ? true : false : false;

    if (!isEmpty(account) && isLoaded(account) && !meetingsFetched) {
      this.getMeetings();
    }

    // FOR ADMINS ONLY
    if (isAdmin && !allMeetingsFetched) {
      this.getAllMeetings();
    }

    return (
      <div></div>
    )
  }
}
