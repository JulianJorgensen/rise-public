import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import classes from './index.css';

@firebaseConnect()
@connect(
  ({ notification, firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
    notification
  })
)
export default class GetMeetings extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  state = {
    upcomingMeetingsFetched: false
  }

  getMeetings = () => {
    let {uid, mentor, timezone} = this.props.account;
    let now = moment(new Date()).tz(timezone);
    let threeMonthsAgo = moment.tz(timezone).subtract(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');
    let inThreeMonths = moment.tz(timezone).add(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');
    let upcomingMeetings = [];
    let completedMeetings = [];

    axios.get(`${fbConfig.functions}/getMeetings`, {
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
      let meetingsSorted = meetings.map((meeting, index) => {
        let meetingTime = moment(meeting.datetime, 'YYYY-MM-DDTHH:mm:ssZ');
        if (meetingTime > now) {
          upcomingMeetings.push(meeting);

          // set notification if meeting is today
          if (meetingTime.format('YYYY-MM-DD').isSame(now.format('YYYY-MM-DD'))) {
            this.setNotification();
          }
        }else{
          completedMeetings.push(meeting);
        }
      });

      this.props.dispatch({
        type: 'SET_MEETINGS',
        upcomingMeetings,
        completedMeetings
      });

      this.setState({
        meetingsFetched: true
      });

      // update site notifications bar if any appointments are upcoming
      // this.updateNotificationBar();
    })
    .catch((error) => {
      console.log(`Error getting meetings`, error);
    });
  }

  setNotification = () => {
    let { account } = this.props;
    this.props.dispatch({
      type: 'SET_NOTIFICATION',
      message: 'You have a meeting today!',
      url: '/video'
    });

    this.setState({ notificationSet : true });
  }

  render () {
    let { account } = this.props;
    let { meetingsFetched } = this.state;

    if (!isEmpty(account) && isLoaded(account) && !meetingsFetched) {
      this.getMeetings();
    }

    return (
      <div></div>
    )
  }
}
