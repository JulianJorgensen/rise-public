import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment-timezone';

import { isMentor, isAdmin } from 'utils/utils';

import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import { ListItem, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import { DatePicker, Dialog } from 'react-toolbox/lib';

import classes from './index.css';

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class MeetingItem extends Component {
  state = {
    meeting: '',
    completed: false
  }

  goToMeeting = (room) => {
    window.open(`https://zoom.us/j/${room}`);
  };

  toggleMeeting = (id, status) => {
    console.log('toggling meeting');
    axios.get(`${fbConfig.functions}/toggleAppointment`, {
        params: {
          id,
          status: status
        }
      })
      .then(() => {
        this.props.dispatch({
          type: 'SET_SNACKBAR',
          message: `Your meeting is now marked as ${status ? 'complete' : 'pending'}!`,
          style: 'warning'
        });
      }).catch((err) => {
        console.log('error toggling meeting: ', err);
      });

    // set completed in local state (so user doesnt have to refresh browser)
    this.setState({
      completed: status === 'yes' ? true : false
    });
  }

  cancelMeeting = (id) => {
    axios.get(`${fbConfig.functions}/cancelAppointment`, {
        params: {
          id
        }
      })
      .then((res) => {
        this.props.dispatch({
          type: 'SET_SNACKBAR',
          message: 'Your meeting was successfully cancelled!',
          style: 'warning'
        });
      }).catch((err) => {
        console.log('error toggling meeting: ', err);
      });

    // set as complete in local state
    this.setState({
      completed: true
    });
  };

  componentWillMount() {
    let { meeting } = this.props;
    let appMetaForm = _.find(meeting.forms, { 'name': 'App Meta' });
    let appMetaFormCompleted = appMetaForm ? _.find(appMetaForm.values, { 'name': 'completed' }) : null;

    this.setState({
      meeting: meeting,
      completed: appMetaFormCompleted ? appMetaFormCompleted.value === 'yes' ? true : false : false
    })
  }

  render() {
    let { account, filter, attendees, admin } = this.props;
    let { meeting, completed } = this.state;
    let { timezone, athletes } = account;

    let upcomingNavItems = () => {
      let isReschedulable = true;
      let meetingTime = moment(meeting.datetime);
      let now = moment();
      let hoursTillMeetingStart = moment.duration(meetingTime.diff(now)).asHours();
      if (hoursTillMeetingStart < 24) {
        isReschedulable = false;
      }

      return (
        <div>
          <MenuItem
            icon='videocam'
            caption='Join Now'
            onClick={() => this.goToMeeting(meeting.location.split(' ')[4])}
          />
          <MenuItem
            icon='schedule'
            caption='Reschedule'
            disabled={!isReschedulable}
            onClick={() => this.props.onReschedule(meeting.id)}
          />
          <MenuDivider />
          <MenuItem
            icon='delete'
            caption='Cancel'
            onClick={() => this.cancelMeeting(meeting.id)}
          />
        </div>
      )
    }

    let completedNavItems = () => {
      return (
        <MenuItem
          icon={completed ? 'replay' : 'done'}
          caption={completed ? 'Mark as not complete' : 'Mark as complete'}
          onClick={() => this.toggleMeeting(meeting.id, completed ? '' : 'yes')}
        />
      )
    }

    let getHeadline = () => {
      if (admin) {
        return `${attendees.mentor.firstName} and ${attendees.athlete.firstName}`
      } else if (isMentor(account.role)) {
        return `You and ${attendees.athlete.firstName}`
      } else {
        return `You and ${attendees.mentor.firstName}`
      }
    }

    return (
      <div>
        <ListItem
          avatar='images/User.png'
          caption={getHeadline()}
          legend={moment(meeting.datetime).tz(timezone).format('MMMM Do YYYY h:mma')}
          theme={classes}
          className={completed ? classes.completed : ''}
          selectable={false}
          rightActions={[
            <IconMenu key={0} icon='more_vert' position='topLeft' menuRipple>
              {filter === 'completed' ? completedNavItems() : upcomingNavItems()}
            </IconMenu>
          ]}
        />
      </div>
    )
  }
}
