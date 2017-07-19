import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

const ACUITY_MENTOR_CALL_ID = 346940;

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class UpcomingAppointments extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  state = {
    upcomingAppointments: [],
    upcomingAppointmentsFetched: false
  }

  getUpcomingAppointments = () => {
    let {uid, mentor} = this.props.account;

    console.log('account from getUpcomingAppoints: ', this.props.account);

    axios.get(`${fbConfig.functions}/getUpcomingAppointments`, {
      params: {
        // calendarID: mentor.acuityCalendarId,
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

      // update site notifications bar if any appointments are upcoming
      // this.updateNotificationBar();
    })
    .catch((error) => {
      console.log(`Error getting upcoming appointments`, error);
    });
  }

  updateNotificationsBar = () => {
    // set redux state

    // this.state.upcomingAppointments.map((appointment) => {
    //   if (appointment.date) {
    //
    //   }
    // });
  }

  componentWillMount() {
    this.getUpcomingAppointments();

    this.props.dispatch({
      type: 'SET_NOTIFICATION',
      message: 'this is a tester'
    });
  }

  render () {
    console.log('upcoming... props: ', this.props);
    const { account } = this.props;

    const accountExists = isLoaded(account) && !isEmpty(account);
    if (!accountExists){
      return <LoadingSpinner />
    }

    console.log('upcoming... account exists ? ', accountExists);

    const { firstName, timezone, mentor } = account;
    let { upcomingAppointments, upcomingAppointmentsFetched } = this.state;

    console.log('roles from render: ', this.props.roles);

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
