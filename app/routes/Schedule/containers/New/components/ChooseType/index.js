import React from 'react';
import classes from './index.css';

const RECURRING_WEEKS = ENV_CONFIG.RECURRING_WEEKS;

const ChooseType = ({ handleRecurring }) => {
  return (
    <div className={classes.container}>
      <h2>Which kind of session would you like to schedule?</h2>
      <div className={classes.scheduleType}>
        <div
          className={classes.single}
          onClick={() => handleRecurring(false)}
        >
          <h3>Single session</h3>
        </div>
        <div
          className={classes.recurring}
          onClick={() => handleRecurring(true)}
        >
          <h3>Recurring</h3>
          <small>(season of {RECURRING_WEEKS} sessions)</small>
        </div>
      </div>
    </div>
  )
};

export default ChooseType;
