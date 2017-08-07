import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { getAttendeesFromMeeting } from 'utils/utils';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@userIsAuthenticated
@firebaseConnect([
  'users'
])
@connect(
  ({ firebase, meetings }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
    users: dataToJS(firebase, 'users'),
    meetings
  })
)
export default class AllMeetings extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  state = {
    upcomingMeetings: [],
    completedMeetings: [],
    sorted: false
  }

  render () {
    let { account, meetings, filter, limit, users } = this.props;
    let { firstName, timezone, mentor } = account;
    let attendees, meetingMentor, meetingAttendee;

    if(!meetings){
      return (
        <LoadingSpinner />
      )
    }

    if(!meetings.all){
      return (
        <LoadingSpinner />
      )
    }

    let { upcoming, completed } = meetings.all;

    if (filter === 'completed') {
      if(completed.length > 0) {
        if (limit) {
          completed = completed.slice(0, limit);
        }
        return (
          <div className={classes.completed}>
            <h3>Completed Meetings</h3>
            {completed.map((meeting, index) => {
              attendees = meeting.forms.length > 0 ? getAttendeesFromMeeting(meeting.forms, users) : {};
              meetingAttendee = attendees.athlete ? attendees.athlete.firstName : `${meeting.firstName} ${meeting.lastName}`;
              meetingMentor = attendees.mentor ? attendees.mentor.firstName : meeting.calendar;
              return (
                <div key={index} className={classes.logItem}>
                  <h4 className={classes.title}>{meetingMentor} and {meetingAttendee}</h4>
                  <date className={classes.date}>{moment(meeting.datetime).tz(timezone).format('MMMM Do YYYY h:mma z (Z)')}</date>
                  <div className={classes.description}>{meeting.type}</div>
                </div>
              )
            })}
          </div>
        )
      }else{
        return (
          <div></div>
        )
      }
    }

    if (upcoming.length > 0) {
      if (limit) {
        upcoming = upcoming.slice(0, limit);
      }
      return (
        <div>
          <h3>Upcoming Meetings</h3>
          {upcoming.map((meeting, index) => {
            attendees = meeting.forms.length > 0 ? getAttendeesFromMeeting(meeting.forms, users) : {};
            meetingAttendee = attendees.athlete ? attendees.athlete.firstName : `${meeting.firstName} ${meeting.lastName}`;
            meetingMentor = attendees.mentor ? attendees.mentor.firstName : meeting.calendar;
            return (
              <div key={index} className={classes.logItem}>
                <h4 className={classes.title}>{meetingMentor} and {meetingAttendee}</h4>
                <date className={classes.date}>{moment(meeting.datetime).tz(timezone).format('MMMM Do YYYY h:mma z (Z)')}</date>
                <div className={classes.description}>{meeting.type}</div>
              </div>
            )
          })}
        </div>
      )
    }else{
      return (
        <div>
          <h3>Upcoming Meetings</h3>
          <div>You don't have any upcoming meetings. <Link to='/schedule'>Schedule one now</Link></div>
        </div>
      )
    }
  }
}
