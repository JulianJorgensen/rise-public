import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment-timezone';
import { isMentor } from 'utils/utils';

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
      console.log('settinv completed to true');
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
      console.log('cancelled meeting', res);
    }).catch((err) => {
      console.log('error toggling meeting: ', err);
    });

    // set as complete in local state
    this.setState({
      completed: true
    });
  };

  rescheduleMeeting = (id) => {

  };

  confirmRescheduledMeeting = (status) => {
    axios.get(`${fbConfig.functions}/rescheduleAppointment`, {
      params: {
        // datetime: `${moment(selectedDate).format('YYYY-MM-DD')}${moment(selectedTime).tz(account.timezone).format('THH:mmZ')}`,
        // id: ,
        // notes:
      }
    })
    .then((response) => {
      let confirmation = response.data;
    }).catch((err) => {
      console.log('error rescheduling: ', err);
    });
  };

  componentWillMount() {
    let { meeting } = this.props;
    let appMetaForm = _.find(meeting.forms, { 'name': 'App Meta' });

    this.setState({
      meeting: meeting,
      completed: _.find(appMetaForm.values, { 'name': 'completed' }).value === 'yes' ? true : false
    })
  }

  render() {
    let { account, filter } = this.props;
    let { meeting, completed } = this.state;
    let { timezone, athletes } = account;
    let attendeeUid, meetingAttendee;
    let appMetaForm = _.find(meeting.forms, { 'name': 'App Meta' });

    if (isMentor(account.role)) {
      attendeeUid = _.find(appMetaForm.values, { 'name': 'uid' }).value;
      meetingAttendee = _.find(athletes, { 'uid':  attendeeUid });
    }else{
      meetingAttendee = mentor;
    }

    let upcomingNavItems = () => {
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
            onClick={() => this.rescheduleMeeting(meeting.id)}
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

    return (
      <div>
        <ListItem
          avatar='https://dl.dropboxusercontent.com/u/2247264/assets/m.jpg'
          caption={`${meeting.type} with ${meetingAttendee.firstName}`}
          legend={moment(meeting.datetime).tz(timezone).format('MMMM Do YYYY h:mma')}
          theme={classes}
          className={completed ? classes.completed : ''}
          selectable={false}
          rightActions={[
            <IconMenu icon='more_vert' position='topLeft' menuRipple>
              {filter === 'completed' ? completedNavItems() : upcomingNavItems()}
            </IconMenu>
          ]}
        />
      </div>
    )
  }
}
