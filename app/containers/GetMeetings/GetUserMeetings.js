import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { sortMeetings, setUpcomingMeetingNotification } from './utils';
import { isMentor, isAdmin } from 'utils/utils';

@firebaseConnect()
@connect(
  ({ notification, firebase, meetings }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
    meetings
  })
)
export default class GetUserMeetings extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  fetchMeetings() {
    let { account } = this.props;
    let { uid, timezone } = account;

    let threeMonthsAgo = moment.tz().subtract(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');
    let inThreeMonths = moment.tz().add(3, 'M').format('YYYY-MM-DDTHH:MM:SSz');

    axios.get(`${fbConfig.functions}/${isMentor(account.role) ? 'getMeetingsByMentorUid' : 'getMeetingsByUid'}`, {
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

      this.props.dispatch({
        type: 'SET_MEETINGS',
        upcoming: meetingsSorted.upcomingMeetings,
        completed: meetingsSorted.completedMeetings
      });

      this.props.dispatch({
        type: 'MEETINGS_NEEDS_UPDATE',
        state: false
      });
    });
  }

  componentWillMount() {
    this.fetchMeetings();
  }

  componentDidUpdate() {
    let { meetings } = this.props;
    if (meetings.needsUpdate) {
      this.fetchMeetings();
    }
  }

  render () {
    return (
      <div></div>
    )
  }
}
