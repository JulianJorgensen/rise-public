import React, { PropTypes } from 'react'
import ProgressBar from 'react-toolbox/lib/progress_bar';
import classes from './LoadingSpinner.css'

export const LoadingSpinner = () => (
  <div className={classes.container}>
    <div className={classes.progress}>
      <ProgressBar type="circular" mode="indeterminate" />
    </div>
  </div>
)

export default LoadingSpinner
