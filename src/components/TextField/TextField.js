import React, { PropTypes } from 'react'
import cn from 'classnames';
import Input from 'react-toolbox/lib/input';
import classes from './TextField.css';

export const TextField = ({ className, input, type, required, label, meta: { touched, error }, ...custom }) => {
  const _className = cn(className, classes.default);

  return (
    <Input
      className={_className}
      label={label}
      type={type}
      required={required}
      {...input}
      {...custom}
    />
  )
}

TextField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  meta: PropTypes.object
}

export default TextField
