import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { getAttendeesFromMeeting } from 'utils/meetings';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@withRouter
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
              attendees = getAttendeesFromMeeting(meeting, users);
              return (
                <div key={index} className={classes.logItem}>
                  <h4 className={classes.title}>{attendees.mentor.firstName} and {attendees.athlete.firstName}</h4>
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
            attendees = getAttendeesFromMeeting(meeting, users);
            return (
              <div key={index} className={classes.logItem}>
                <h4 className={classes.title}>{attendees.mentor.firstName} and {attendees.athlete.firstName}</h4>
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
