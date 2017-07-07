import React, { PropTypes, Component } from 'react'
import cn from 'classnames';
import { RadioGroup as RTRadioGroup, RadioButton as RTRadioButton } from 'react-toolbox/lib/radio';
import classes from './RadioGroup.css';

export default class RadioGroup extends Component {
  state = {value: ''}

  componentWillMount() {
    let {input} = this.props;
    if (input){
      this.setState({value: input.value});
    }
  }

  handleChange(value) {
    let {input} = this.props;

    // set local state
    this.setState({value});

    // update redux form state
    input.onChange(value);
  }

  render() {
    let { inputs } = this.props;
    return (
      <RTRadioGroup name={name} value={this.state.value} onChange={this.handleChange.bind(this)}>
        {inputs.map((input, index) => {
          return <RTRadioButton key={index} label={input.label} value={input.value} />
        })}
      </RTRadioGroup>
    )
  }
}
