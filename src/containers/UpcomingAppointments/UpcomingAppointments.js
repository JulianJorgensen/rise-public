import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { firebase as fbConfig } from 'config';
import moment from 'moment-timezone';
import { UserIsAuthenticated, UserHasPermission } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './UpcomingAppointments.css';

const ACUITY_MENTOR_CALL_ID = 346940;

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    authError: pathToJS(firebase, 'authError'),
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class UpcomingAppointments extends Component {
  state = {
    upcomingAppointments: [],
    upcomingAppointmentsFetched: false
  }

  getUpcomingAppointments = () => {
    let {uid, mentor} = this.props.account;

    axios.get(`${fbConfig.functions}/getUpcomingAppointments`, {
      params: {
        calendarID: mentor.acuityCalendarId,
        appointmentTypeID: ACUITY_MENTOR_CALL_ID,
        uid: uid
      }
    })
    .then((response) => {
      let upcomingAppointments = response.data;
      this.setState({
        upcomingAppointments,
        upcomingAppointmentsFetched: true
      });
    })
    .catch((error) => {
      console.log(`Error getting upcoming appointments`, error);
    });
  }

  componentWillMount(){
    this.getUpcomingAppointments();
  }

  render () {
    const { projects, auth, account } = this.props;
    const { firstName, timezone, mentor } = account;
    let { upcomingAppointments, upcomingAppointmentsFetched } = this.state;

    let renderUpcomingAppointments = () => {
      return upcomingAppointments.map((appointment) => {
        return (
          <div className={classes.logItem}>
            <h4 className={classes.title}>{appointment.type} with {mentor.firstName}</h4>
            <date className={classes.date}>{moment(appointment.datetime).tz(timezone).format('MMMM Do YYYY h:mma z (Z)')}</date>
            <div className={classes.description}>{appointment.type}</div>
            <div><a href={`https://zoom.us/j/${appointment.location.split(' ')[3]}`} target="new">Join now</a></div>
          </div>
        )
      });
    }

    return (
      <div>
        {upcomingAppointmentsFetched ? renderUpcomingAppointments() : <LoadingSpinner />}
      </div>
    )
  }
}
