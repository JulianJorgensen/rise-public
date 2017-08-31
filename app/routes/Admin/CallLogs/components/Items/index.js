import React, { Component, cloneElement, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import moment from 'moment-timezone';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

import { checkIfMeetingIsCompleted, getAttendeesFromMeeting } from 'utils/meetings';
import CheckedIcon from '-!svg-react-loader?name=Icon!assets/icons/regular/check.svg';

@firebaseConnect([
  'users'
])
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    users: dataToJS(firebase, 'users')
  })
)
export default class CallLogsItems extends Component {
  render() {
    let { data, account, users } = this.props;
    let { timezone } = account;
    let attendees, isCompleted;

    let items = data.map((meeting, index) => {
      attendees = getAttendeesFromMeeting(meeting, users);
      isCompleted = checkIfMeetingIsCompleted(meeting);
      return (
        <TableRow key={index} selectable={false}>
          <TableCell><div>{isCompleted ? <CheckedIcon /> : ''}</div></TableCell>
          <TableCell><div>{meeting.type}</div></TableCell>
          <TableCell><div>{moment(meeting.datetime).tz(timezone).format('MMMM Do YYYY h:mma z (Z)')}</div></TableCell>
          <TableCell><div>{attendees.mentor ? attendees.mentor.firstName : ''}</div></TableCell>
          <TableCell><div>{attendees.athlete ? attendees.athlete.firstName : ''}</div></TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        <Table selectable={false}>
          <TableHead selectable={false}>
            <TableCell><div></div></TableCell>
            <TableCell><div>Type</div></TableCell>
            <TableCell><div>Date</div></TableCell>
            <TableCell><div>Mentor</div></TableCell>
            <TableCell><div>Athlete</div></TableCell>
          </TableHead>
          {items}
        </Table>
      </div>
    )
  }
}
