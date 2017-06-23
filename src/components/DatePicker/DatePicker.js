import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import RTDatePicker from 'react-toolbox/lib/date_picker';
import classes from './DatePicker.css';

function _calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default class DatePicker extends Component {
  state = { date: '' }

  handleChange = (item, value) => {
    this.setState({...this.state, [item]: value});

    // calculate the age
    this.props.ageCallback(_calculateAge(value));
  };

  render() {
    let { className, label, required } = this.props;
    const _className = cn(className, classes.default);

    return (
      <RTDatePicker
        className={_className}
        label={label}
        required={required}
        sundayFirstDayOfWeek
        onChange={() => this.handleChange.bind(this, 'date')}
        value={this.state.date}
      />
    );
  }
}
