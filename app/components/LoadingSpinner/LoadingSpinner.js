import React, { PropTypes } from 'react'
import cn from 'classnames';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import classes from './LoadingSpinner.css'

export const LoadingSpinner = ({ small }) => {
  let _wrapperStyles = cn(classes.wrapper, {
    [classes.small]: small
  });  
  return (
    <div className={_wrapperStyles}>
      <ProgressBar multicolor type="circular" mode="indeterminate" />
    </div>
  )
}

export default LoadingSpinner
