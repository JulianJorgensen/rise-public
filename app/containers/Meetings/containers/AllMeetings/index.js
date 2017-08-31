import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';

import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

import MeetingItem from '../../components/MeetingItem';
import { getAttendeesFromMeeting, fetchAllMeetings } from 'utils/meetings';

import Reschedule from '../Reschedule';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@withRouter
@firebaseConnect([
  'users'
])
@connect(
  ({ firebase, meetings }) => ({
    account: pathToJS(firebase, 'profile'),
    users: dataToJS(firebase, 'users'),
    meetings
  })
)
export default class AllMeetings extends Component {
  state = {
    upcomingMeetings: [],
    completedMeetings: [],
    sorted: false,
    rescheduleMeetingId: ''
  }

  handleReschedule = (rescheduleMeetingId) => {
    this.setState({
      rescheduleMeetingId
    });
  };

  handleCloseRescheduling = () => {
    this.setState({
      rescheduleMeetingId: ''
    });
  };

  componentWillMount() {
    let { account, dispatch } = this.props;
    setTimeout(() => {
      console.log('acc from all meetings', account);
      if (account) {
        console.log('about to fetch all meetings');
        fetchAllMeetings(account, dispatch);
      }
    }, 1000);
  }

  render () {
    let { meetings, filter, showAllUsers, users, limit } = this.props;
    let attendees;

    console.log('users from all meetings', users);

    if (!meetings.all || !users) {
      return (
        <LoadingSpinner />
      )
    }

    if (!meetings.all.completed || !meetings.all.upcoming) {
      console.log('all meeting', meetings);
      return (
        <LoadingSpinner />
      )
    }

    let { upcoming, completed } = this.props.meetings.all;
    console.log('users from AllMeetings', users);

    if (filter === 'completed') {
      if(completed.length > 0) {
        if (limit) {
          completed = completed.slice(0, limit);
        }
        return (
          <div className={classes.completed}>
            <List selectable ripple>
              <ListSubHeader caption='Past Meetings' />
              {completed.map((meeting, index) => {
                attendees = getAttendeesFromMeeting(meeting, users);
                return (
                  <MeetingItem
                    key={index}
                    meeting={meeting}
                    filter={filter}
                    attendees={attendees}
                    admin={true}
                  />
                )
              })}
            </List>
          </div>
        )
      }
    }

    if (upcoming.length > 0) {
      if (limit) {
        upcoming = upcoming.slice(0, limit);
      }
      return (
        <div>
          <List selectable ripple>
            <ListSubHeader caption='Upcoming Meetings' />
            {upcoming.map((meeting, index) => {
              attendees = getAttendeesFromMeeting(meeting, users);
              return (
                <MeetingItem
                  key={index}
                  meeting={meeting}
                  onReschedule={this.handleReschedule}
                  attendees={attendees}
                  admin={true}
                />
              )
            })}
          </List>
          <Reschedule
            id={this.state.rescheduleMeetingId}
            handleClose={this.handleCloseRescheduling}
          />
        </div>
      )
    }else{
      return (
        <div>
          <List selectable ripple>
            <ListSubHeader caption='Upcoming Meetings' />
            <ListItem
              caption='There are no upcoming meetings.'
              legend='Schedule one now'
              onClick={() => this.props.history.push('/schedule')}
            />
          </List>
        </div>
      )
    }

    return (
      <div></div>
    )
  }
}
