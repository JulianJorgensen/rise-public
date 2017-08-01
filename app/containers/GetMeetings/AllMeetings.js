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
export default class AllMeetings extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  state = {
    meetingsFetched: false
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
    let { meetingsFetched } = this.state;

    if (!meetingsFetched) {
      this.getAllMeetings();
    }

    return (
      <div></div>
    )
  }
}
