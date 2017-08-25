import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import moment from 'moment-timezone';
import { DatePicker } from 'react-toolbox/lib';

import LoadingSpinner from 'components/LoadingSpinner';
import { isMentor, isAdmin } from 'utils/utils';

import * as utils from '../../utils/utils';

import classes from './index.css';

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class AvailableDates extends Component {
  state = {
    active: false,
    dates: [],
    fetched: false
  }

  fetchAvailableDates = (month) => {
    let { mentor, timezone } = this.props.account;
    utils.fetchAvailableDates(month, mentor.acuityCalendarId, timezone).then((availableDates) => {
      this.setState({ availableDates: availableDates });
    });
  };

  handleOnChange = (selectedDate) => {
    // set date in local state
    this.setState({
      selectedDate
    });

    // set date in parent state
    this.props.onSetDate(selectedDate);
  };

  render() {
    let props = this.props;
    let { selectedDate } = this.state;
    return (
      <DatePicker
        active={props.show}
        onDismiss={this.handleClose}
        label={props.label ? props.label : 'Date'}
        onChange={this.handleOnChange}
        value={selectedDate}
        onClick={props.handleShowTimes}
        // minDate={today}
        // maxDate={today.add(MAX_MONTHS_IN_ADVANCE, 'M')}
        autoOk={true}
        enabledDates={this.state.dates}
        required
        sundayFirstDayOfWeek
      />
    )
  }
};
