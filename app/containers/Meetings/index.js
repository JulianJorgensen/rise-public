import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';

import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

import MeetingItem from './components/MeetingItem';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@withRouter
@firebaseConnect()
@connect(
  ({ meetings }) => ({
    meetings
  })
)
export default class Meetings extends Component {
  state = {
    upcomingMeetings: [],
    completedMeetings: [],
    sorted: false
  }

  render () {
    let { meetings, filter } = this.props;

    if (!meetings.upcoming && !meetings.completed) {
      return (
        <LoadingSpinner />
      )
    }

    let { upcoming, completed } = meetings;

    if (filter === 'completed') {
      if(completed.length > 0) {
        return (
          <div className={classes.completed}>
            <List selectable ripple>
              <ListSubHeader caption='Past Meetings' />
              {completed.map((meeting, index) => {
                return (
                  <MeetingItem
                    key={index}
                    meeting={meeting}
                    filter={filter}
                  />
                )
              })}
            </List>
          </div>
        )
      }
    }

    if (upcoming.length > 0) {
      return (
        <div>
          <List selectable ripple>
            <ListSubHeader caption='Upcoming Meetings' />
            {upcoming.map((meeting, index) => {
              return (
                <MeetingItem
                  key={index}
                  meeting={meeting}
                />
              )
            })}
          </List>
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
