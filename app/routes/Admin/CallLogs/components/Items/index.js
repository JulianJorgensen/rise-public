import React, { Component, cloneElement, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import moment from 'moment-timezone';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

import { getAttendeesFromMeeting } from 'utils/utils';

@userIsAuthenticated
@userHasPermission('admin')
@firebaseConnect([
  'users'
])
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
    users: dataToJS(firebase, 'users')
  })
)
export default class CallLogsItems extends Component {
  render() {
    let { data, account, users } = this.props;
    let { timezone } = account;
    let attendees;

    let items = data.map((meeting, index) => {
      attendees = getAttendeesFromMeeting(meeting, users);
      return (
        <TableRow key={index}>
          <TableCell>{meeting.type}</TableCell>
          <TableCell>{moment(meeting.datetime).tz(timezone).format('MMMM Do YYYY h:mma z (Z)')}</TableCell>
          <TableCell>{attendees.mentor.firstName}</TableCell>
          <TableCell>{attendees.athlete.firstName}</TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        <Table>
          <TableHead>
            <TableCell>Type</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Mentor</TableCell>
            <TableCell>Athlete</TableCell>
          </TableHead>
          {items}
        </Table>
      </div>
    )
  }
}
