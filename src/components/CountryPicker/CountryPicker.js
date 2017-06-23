import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import Dropdown from 'react-toolbox/lib/dropdown';
import classes from './CountryPicker.css';
import countryList from 'country-list';

const countries = countryList().getNames().map((countryName) => {
  return {
    value: countryName,
    label: countryName
  }
});


export default class CountryPicker extends Component {
  state = { value: 'United States' };

  handleChange = (value) => {
    this.setState({value: value});
  };

  render() {
    let { className, label, required } = this.props;
    const _className = cn(className, classes.default);

    return (
      <Dropdown
        className={_className}
        auto
        onChange={this.handleChange}
        source={countries}
        value={this.state.value}
      />
    );
  }
}
