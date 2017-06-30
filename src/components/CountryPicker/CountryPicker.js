import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import Dropdown from 'react-toolbox/lib/dropdown';
import classes from './CountryPicker.css';

export default class CountryPicker extends Component {
  render() {
    let { className, label, required, countries, country, handleCountryChange } = this.props;
    const _className = cn(className, classes.default);

    return (
      <Dropdown
        className={_className}
        auto
        onChange={handleCountryChange}
        source={countries}
        value={country}
      />
    );
  }
}
