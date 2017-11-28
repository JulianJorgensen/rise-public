import React from 'react';
import cn from 'classnames';
import RTDialog from 'react-toolbox/lib/dialog';
import classes from './index.css';

const Dialog = ({ className, ...others }) => {
  const wrapperStyles = cn(className, classes);

  return (
    <RTDialog className={wrapperStyles} theme={classes} {...others}/>
  )
};

export default Dialog;
