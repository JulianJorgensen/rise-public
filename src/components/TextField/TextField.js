import React, { PropTypes } from 'react'
import Input from 'react-toolbox/lib/input';

export const TextField = ({ input, type, required, label, meta: { touched, error }, ...custom }) => (
  <Input
    label={label}
    type={type}
    required={required}
    {...input}
    {...custom}
  />
)

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
}

export default TextField
