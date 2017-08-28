import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';

import AvailableTimes from '../AvailableTimes';
import AvailableDates from '../AvailableDates';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@firebaseConnect()
@connect(
  ({ meetings }) => ({
    meetings
  })
)
export default class ChooseDateTime extends Component {
  state = {
    selectedDateTime: '',
    selectedDate: '',
    showAvailableTimes: false,
    showAvailableDates: false
  }

  handleDateChange = (selectedDate) => {
    console.log('handle select date', selectedDate);
    this.setState({
      selectedDate
    }, () => {
      this.setState({
        showAvailableTimes: true,
        showAvailableDates: false,
        selectedDateTime: ''
      });
    });
  };

  handleSelectDateTime = (selectedDateTime) => {
    // set local state
    this.setState({
      selectedDateTime,
      showAvailableTimes: false
    });

    // set parent state
    this.props.onSetDateTime(selectedDateTime);
  };

  handleShowDates = () => {
    this.setState({
      showAvailableDates: true,
      showAvailableTimes: false
    });
  };

  handleShowTimes = () => {
    this.setState({
      showAvailableDates: false,
      showAvailableTimes: true
    });
  };

  handleCloseTimes = () => {
    this.setState({
      showAvailableDates: true,
      showAvailableTimes: false
    });
  };

  render() {
    let { selectedDateTime, selectedDate, showAvailableTimes, showAvailableDates } = this.state;
    let { recurring } = this.props;

    return (
      <div className={classes.container}>
        <AvailableDates
          show={showAvailableDates}
          handleShowTimes={this.handleShowTimes}
          onSetDate={this.handleDateChange}
          label={recurring ? 'Start Date' : 'Date'}
        />

        <AvailableTimes
          date={selectedDate}
          dateTime={selectedDateTime}
          show={showAvailableTimes}
          onInputClick={this.handleShowTimes}
          handleClose={this.handleCloseTimes}
          onSelect={this.handleSelectDateTime}
        />
      </div>
    )
  }
}
