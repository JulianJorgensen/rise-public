import React, { Component, cloneElement, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import moment from 'moment-timezone';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';
import { getAttendeesFromMeeting } from 'utils/utils';
import {CSVLink, CSVDownload} from 'react-csv';

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
export default class ExportCallLogs extends Component {
  render() {
    let { data, account, users, meetings } = this.props;
    let { timezone } = account;
    let attendees;

    const csvData = [];
    csvData.push([
      'Id', 'Date', 'Time', 'Timezone', 'Calendar', 'Date Created', 'Athlete Email', 'Athlete Name', 'Mentor Name', 'Call Type'
    ]);
    let csvItems = meetings.map((meeting, index) => {
      attendees = getAttendeesFromMeeting(meeting, users);
      csvData.push([
        meeting.id,
        meeting.date,
        `${meeting.time} - ${meeting.endTime}`,
        meeting.timezone,
        meeting.dateCreated,
        meeting.email,
        `${attendees.athlete.firstName} ${attendees.athlete.lastName}`,
        `${attendees.mentor.firstName} ${attendees.mentor.lastName}`,
        meeting.type
      ]);
    });

    return (
      <CSVLink
        data={csvData}
        className={classes.download}
        filename={"rise-call-logs.csv"}
      >
        <Button
         label='Download all call logs'
         type='button'
        />
      </CSVLink>
    )
  }
}
