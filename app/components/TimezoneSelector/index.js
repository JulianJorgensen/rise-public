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
    timezone: moment.tz.guess()
  }

  handleChange = (value) => {
    this.setState({timezone: value}, () => {
      console.log('timezoneselector props', this.props);
      if (this.props.input) {
        this.updateReduxForm();
      }
    });
  };

  updateReduxForm = () => {
    let { input } = this.props;
    input.onChange(this.state.timezone);
  };

  componentWillMount() {
    let { input } = this.props;

    if (input.value) {
      let timezone = input.value;
      this.setState({timezone});
    }
  }

  componentDidMount() {
    let { input } = this.props;
    input.onChange(this.state.timezone);
  }

  render() {
    let { className, label, required, input } = this.props;
    const _className = cn(className, classes.default);

    return (
      <Autocomplete
        direction="down"
        selectedPosition="none"
        multiple={false}
        showSuggestionsWhenValueIsSet={true}
        suggestionMatch='anywhere'
        className={_className}
        onChange={this.handleChange.bind(this)}
        source={timezones}
        value={this.state.timezone}
        label='Timezone'
      />
    )
  }
}
