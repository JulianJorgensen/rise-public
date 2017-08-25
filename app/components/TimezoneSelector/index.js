import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import moment from 'moment-timezone';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import classes from './index.css';

import timezoneData from './timezones';
let timezones = {};
Object.entries(timezoneData).map((item) => {
  let timezoneName = item[0];
  let timezoneId = item[1];
  timezones[timezoneName] = `${timezoneName} (${moment().tz(timezoneName).format('Z')})`;
});

export default class TimezoneSelector extends Component {
  state = {
    selectedTimezone: moment.tz.guess()
  }

  handleChange = (value) => {
    this.setState({selectedTimezone: value}, () => {
      if (this.props.input) {
        this.updateReduxForm();
      }
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
      <Autocomplete
        direction="down"
        selectedPosition="none"
        multiple={false}
        className={_className}
        onChange={this.handleChange.bind(this)}
        source={timezones}
        value={this.state.selectedTimezone}
        label='Timezone'
      />
    )
  }
}
