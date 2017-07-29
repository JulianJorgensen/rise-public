import React, { Component, PropTypes } from 'react'
import cn from 'classnames';
import Dropdown from 'react-toolbox/lib/dropdown';
import classes from './index.css';

export default class PreferredContactMethod extends Component {
  state = {
    method: ''
  }

  handleChange = (value) => {
    this.setState({method: value}, () => {
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
          {value: 'text', label: 'Text'},
          {value: 'email', label: 'Email'}
        ]}
        value={this.state.method}
        placeholder={label}
        auto
      />
    )
  }
}
