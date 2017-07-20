import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@userIsAuthenticated
@firebaseConnect()
@connect(
  ({ firebase, meetings }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
    meetings
  })
)
export default class Meetings extends Component {
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
    let { account, meetings, filter } = this.props;
    let { firstName, timezone, mentor } = account;

    if(!meetings){
      return (
        <LoadingSpinner />
      )
    }

    let { upcoming, completed } = meetings;

    if (filter === 'completed') {
      if(completed.length > 0) {
        return (
          <div className={classes.completed}>
            <h3>Completed Meetings</h3>
            {completed.map((meeting, index) => {
              return (
                <div key={index} className={classes.logItem}>
                  <h4 className={classes.title}>{meeting.type} with {mentor.firstName}</h4>
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
      return (
        <div>
          <h3>Upcoming Meetings</h3>
          {upcoming.map((meeting, index) => {
            return (
              <div key={index} className={classes.logItem}>
                <h4 className={classes.title}>{meeting.type} with {mentor.firstName}</h4>
                <date className={classes.date}>{moment(meeting.datetime).tz(timezone).format('MMMM Do YYYY h:mma z (Z)')}</date>
                <div className={classes.description}>{meeting.type}</div>
                <div><a href={`https://zoom.us/j/${meeting.location.split(' ')[3]}`} target="new">Join now</a></div>
              </div>
            )
          })}
        </div>
      )
    }else{
      return (
        <div>You don't have any upcoming meetings. <Link to='/schedule'>Schedule one now</Link></div>
      )
    }
  }
}
