import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import Dropdown from 'react-toolbox/lib/dropdown';
import classes from './index.css';

export default class CompetitionStatus extends Component {
  state = {
    status: ''
  }

  handleChange = (value) => {
    this.setState({status: value}, () => {
      this.updateReduxForm();
    });
  };

  updateReduxForm = () => {
    let {input} = this.props;
    input.onChange(this.state.status);
  };

  render() {
    let { className, label, required } = this.props;
    const _className = cn(className, classes.default);

    return (
      <Dropdown
        className={_className}
        onChange={this.handleChange.bind(this)}
        source={[
          {value: 'active', label: 'Active'},
          {value: 'retired', label: 'Retired'}
        ]}
        value={this.state.status}
        placeholder={label}
        auto
      />
    )
  }
}
