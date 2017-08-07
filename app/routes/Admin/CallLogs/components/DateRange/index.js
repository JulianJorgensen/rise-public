import React, { Component, cloneElement, PropTypes } from 'react';
import moment from 'moment-timezone';
import {DatePicker} from 'react-toolbox/lib/date_picker';
import classes from './index.css';

export default class CallLogsDateRange extends Component {
  render() {
    let { handleDateChange, startDate, endDate } = this.props;
    let today = moment.tz().toDate();

    return (
      <div className={classes.container}>
        <DatePicker
          label={'Start Date'}
          sundayFirstDayOfWeek
          onChange={handleDateChange.bind(this, 'startDate')}
          value={startDate}
          maxDate={today}
          autoOk={true}
        />
        <DatePicker
          label={'End Date'}
          sundayFirstDayOfWeek
          onChange={handleDateChange.bind(this, 'endDate')}
          value={endDate}
          maxDate={today}
          autoOk={true}
        />
      </div>
    )
  }
}
