import React from 'react';
import cn from 'classnames';
import { Snackbar } from 'react-toolbox';
import classes from './Snackbar.css';

const SnackBar = ({ className, ...props }) => {
  const _className = cn(className, classes.default);

  return (
    <Snackbar
      className={_className}
      theme={classes}
      {...props}
    />
  )
};

export default SnackBar;
