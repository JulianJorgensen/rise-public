import React, { PropTypes } from 'react'
import cn from 'classnames';
import Input from 'react-toolbox/lib/input';
import classes from './TextField.css';

export const TextField = ({ className, type, required, label, meta: { touched, error }, input, ...custom }) => {
  const _className = cn(className, classes.default);
  let value = input ? input.value : ''


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

export default TextField
