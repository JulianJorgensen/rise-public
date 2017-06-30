import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import Dropdown from 'react-toolbox/lib/dropdown';
import classes from './StatePicker.css';
import provinces from 'provinces';

export default class StatePicker extends Component {
  state = {
    selectedProvince: '',
    domesticProvinces: []
  }

  handleChange = (value) => {
    this.setState({selectedProvince: value});
  };

  updateProvinces = (country) => {
    let newDomesticProvinces = [];
    provinces.map((province) => {
      if (province.country === country){
        newDomesticProvinces.push({
          value: province.name,
          label: province.name
        });
      }
    });
    if (newDomesticProvinces.length > 0){
      this.setState({
        selectedProvince: newDomesticProvinces[0].value,
        domesticProvinces: newDomesticProvinces
      });
    }else{
      this.setState({
        selectedProvince: '',
        domesticProvinces: []
      });
    }
  }

  componentWillReceiveProps({country}) {
    this.updateProvinces(country);
  }

  componentWillMount() {
    this.updateProvinces(this.props.country);
  }

  render() {
    let { className, label, required, country } = this.props;
    const _className = cn(className, classes.default);

    if (this.state.domesticProvinces.length > 0){
      return (
        <Dropdown
          className={_className}
          auto
          onChange={this.handleChange}
          source={this.state.domesticProvinces}
          value={this.state.selectedProvince}
        />
      );
    }else{
      return (<div></div>)
    }
  }
}
