import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import Dropdown from 'react-toolbox/lib/dropdown';
import classes from './CountryPicker.css';

export default class CountryPicker extends Component {
  state = {
    country: ''
  }

  componentWillMount() {
    let {input, handleCountryChange} = this.props;
    let country;

    if (input){
      country = input.value;
      handleCountryChange(input.value);
    }else{
      country = this.props.country;
    }

    this.setState({country});
  }

  handleChange(value){
    let {input, handleCountryChange} = this.props;
    // set container state (parent). This is mainly for updating the provinces
    handleCountryChange(value);

    // set local state
    this.setState({country: value});

    // update redux form state
    input.onChange(value);
  }

  render() {
    let { className, label, placeholder, required, countries, handleCountryChange } = this.props;
    const _className = cn(className, classes.default);

    return (
      <Dropdown
        className={_className}
        auto
        onChange={this.handleChange.bind(this)}
        source={countries}
        value={this.state.country}
        placeholder={placeholder}
      />
    );
  }
}
