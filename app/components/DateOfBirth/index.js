import React, { Component, PropTypes } from 'react'
import Dropdown from 'react-toolbox/lib/dropdown';
import moment from 'moment-timezone';
import monthsList from 'months';
import classes from './index.css';

function _calculateAge(day,month,year) {
  var ageDifMs = Date.now() - moment(`${day}-${month}-${year}`, 'DD-MM-YYYY');
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


let days = [];
for( let i = 1; i <= 31; i++ ) {
  days.push({
    value: moment(i, 'DD').format('DD'),
    label: i
  });
}

let months = monthsList.map((month, i) => {
  return {
    value: moment(i+1, 'MM').format('MM'),
    label: month
  }
});

let years = [];
for( let i = 2015; i >= 1940; i-- ) {
  years.push({
    value: moment(i, 'YYYY').format('YYYY'),
    label: i
  });
}

export default class DateOfBirth extends Component {
  state = {
    day: '',
    month: '',
    year: ''
  }

  componentWillMount() {
    let { input } = this.props;
    if (input.value) {
      let birthday = moment(input.value, 'DD-MM-YYYY');
      this.setState({
        day: birthday.format('DD'),
        month: birthday.format('MM'),
        year: birthday.format('YYYY')
      });
    }
  }

  handleChange = (item, value) => {
    this.setState({...this.state, [item]: value}, () => {
      let { day, month, year } = this.state;
      // calculate the age
      this.props.ageCallback(_calculateAge(day, month, year));

      // update redux form state
      this.updateReduxForm()
    });
  }

  updateReduxForm = () => {
    let { day, month, year } = this.state;
    let { input } = this.props;
    let birthDayParsed = `${day}-${month}-${year}`;

    input.onChange(birthDayParsed);
  };

  render() {
    let { label, required, input } = this.props;
    let { day, month, year } = this.state;

    return (
      <div className={classes.container}>
        <label className={classes.label}>Date of birth</label>
        <div className={classes.inputs}>
          <Dropdown
            className={classes.month}
            onChange={this.handleChange.bind(this, 'month')}
            source={months}
            value={month}
            auto
          />
          <Dropdown
            className={classes.day}
            onChange={this.handleChange.bind(this, 'day')}
            source={days}
            value={day}
            auto
          />
          <Dropdown
            className={classes.year}
            onChange={this.handleChange.bind(this, 'year')}
            source={years}
            value={year}
            auto
          />
        </div>
      </div>
    );
  }
}
