import React, { PropTypes } from 'react'
import cn from 'classnames';
import Input from 'react-toolbox/lib/input';
import classes from './TextField.css';

export const TextField = ({ className, type, required, label, meta: { touched, error }, input, ...custom }) => {
  const _className = cn(className, classes.default);

  return (
    <Input
      className={_className}
      label={label}
      type={type}
      required={required}
      theme={classes}
      {...input}
      {...custom}
    />
  )
}

export default TextField
