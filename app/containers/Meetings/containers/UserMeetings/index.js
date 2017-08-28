import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';

import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

import MeetingItem from '../../components/MeetingItem';
import { fetchMeetings, getAttendeesFromMeeting } from 'utils/meetings';

import Reschedule from '../Reschedule';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@withRouter
@firebaseConnect()
@connect(
  ({ firebase, meetings }) => ({
    account: pathToJS(firebase, 'profile'),
    meetings
  })
)
export default class UserMeetings extends Component {
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
      if (account) {
        fetchMeetings(account, dispatch);
      }
    }, 1000);
  }

  // componentDidUpdate() {
  //   let { meetings, account, dispatch } = this.props;
  //   if (meetings.needsUpdate) {
  //     setTimeout(() => {
  //       fetchMeetings(account, dispatch);
  //     }, 2000);
  //   }
  // }

  render () {
    let { meetings, filter, showAllUsers, account, limit } = this.props;
    let attendees;

    if (!account || (!meetings.upcoming && !meetings.completed)) {
      return (
        <LoadingSpinner />
      )
    }

    let { upcoming, completed } = meetings;
    let users = Object.assign(account.athletes || {}, {mentor: account.mentor || {}}, {account: account});
    console.log('users from UserMeetings', users);

    if (filter === 'completed') {
      console.log('filter is completed', filter);
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
                  />
                )
              })}
            </List>
          </div>
        )
      }else{
        return (<div></div>)
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
              caption='You dont have any upcoming meetings.'
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
