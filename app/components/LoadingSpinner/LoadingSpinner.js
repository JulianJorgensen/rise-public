import React, { PropTypes } from 'react'
import ProgressBar from 'react-toolbox/lib/progress_bar';
import classes from './LoadingSpinner.css'

export const LoadingSpinner = () => (
  <div className={classes.container}>
    <ProgressBar multicolor type="circular" mode="indeterminate" />
  </div>
)

export default LoadingSpinner
