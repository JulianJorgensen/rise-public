import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import Dropdown from 'react-toolbox/lib/dropdown';
import classes from './StatePicker.css';
import provinces from 'provinces';

export default class StatePicker extends Component {
  state = {
    selectedProvince: '',
    domesticProvinces: [],
    country: ''
  }

  handleChange = (value) => {
    this.setState({selectedProvince: value}, () => {
      this.updateReduxForm();
    });
  };

  updateReduxForm = () => {
    let { input } = this.props;
    input.onChange(this.state.selectedProvince);
  };

  updateProvinces = (country) => {
    let newDomesticProvinces = [];
    let { input } = this.props;
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
        selectedProvince: input ? input.value : newDomesticProvinces[0].value,
        domesticProvinces: newDomesticProvinces,
        country
      });
    }else{
      this.setState({
        selectedProvince: '',
        domesticProvinces: [],
        country
      });
    }
  }

  componentWillReceiveProps({country}) {
    if (country !== this.state.country){
      this.updateProvinces(country);
    }
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
          onChange={this.handleChange.bind(this)}
          source={this.state.domesticProvinces}
          value={this.state.selectedProvince}
          placeholder="State / Province"
          auto
        />
      )
    }else{
      return <div></div>
    }
  }
}
