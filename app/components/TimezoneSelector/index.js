import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import moment from 'moment-timezone';
import Dropdown from 'react-toolbox/lib/dropdown';
import classes from './index.css';

import timezoneData from './timezones';
let timezones = Object.entries(timezoneData).map((item) => {
  let timezoneName = item[0];
  let timezoneId = item[1];
  return ({
    value: timezoneName,
    label: `${timezoneName} (${moment().tz(timezoneName).format('Z')})`
  })
});

export default class TimezoneSelector extends Component {
  state = {
    selectedTimezone: ''
  }

  handleChange = (value) => {
    this.setState({selectedTimezone: value}, () => {
      this.updateReduxForm();
    });
  };

  updateReduxForm = () => {
    let { input } = this.props;
    input.onChange(this.state.selectedTimezone);
  };

  render() {
    let { className, label, required, input } = this.props;
    const _className = cn(className, classes.default);

    return (
      <Dropdown
        className={_className}
        onChange={this.handleChange.bind(this)}
        source={timezones}
        value={input.value}
        label='Timezone'
        auto
      />
    )
  }
}
