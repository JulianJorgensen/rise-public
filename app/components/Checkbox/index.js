import React, { PropTypes, Component } from 'react'
import cn from 'classnames';
import { Checkbox as RTCheckbox } from 'react-toolbox/lib/checkbox';
import classes from './index.css';

export default class Checkbox extends Component {
  state = {checked: false}

  componentWillMount() {
    let {input} = this.props;
    if (input){
      this.setState({checked: input.value ? input.value : false});
    }
  }

  handleChange(checked) {
    let { input } = this.props;

    // set local state
    this.setState({checked});

    // update redux form state
    if(input) input.onChange(checked);
  }

  render() {
    let { input, label, required } = this.props;
    return (
      <RTCheckbox
        checked={this.state.checked}
        label={label}
        onChange={this.handleChange.bind(this)}
        required
      />
    )
  }
}
