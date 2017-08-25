import React from 'react';
import moment from 'moment-timezone';

import { isMentor, isAdmin } from 'utils/utils';

import { Checkbox } from 'react-toolbox/lib';
import AssignAthlete from '../AssignAthlete';
import ChooseDateTime from '../../../../components/ChooseDateTime';
import TimezoneSelector from 'components/TimezoneSelector';
import LoadingSpinner from 'components/LoadingSpinner';

import Button from 'components/Button';

import classes from './index.css';

const RECURRING_WEEKS = ENV_CONFIG.RECURRING_WEEKS;

const ScheduleForm = ({ ...props }) => {

  if(!props.show) {
    return (
      <div></div>
    )
  }

  return (
    <div className={classes.container}>
      <h2>Scheduling {props.recurring ? `${RECURRING_WEEKS} recurring sessions` : 'a single session'} with your {isMentor(props.account.role) ? `athlete ${ props.selectedAthlete ? props.selectedAthleteAccount.firstName : '' }` : `mentor ${props.account.mentor.firstName}`}</h2>

      <form onSubmit={props.onSubmit} className={classes.scheduleForm}>

        { isMentor(props.account.role) ?
          <AssignAthlete
            handleSelectedAthlete={props.handleSelectedAthlete}
            assignedAthletes={props.assignedAthletes}
            selectedAthlete={props.selectedAthlete}
          /> : '' }

        <ChooseDateTime
          onSetDateTime={props.onSetDateTime}
          onSetTime={props.onSetTime}
          recurring={props.recurring}
        />

        <TimezoneSelector changeable />

        <Checkbox
          label="Recurring"
          checked={props.recurring}
          onChange={props.handleRecurring}
        />

        <Button
          type="submit"
          label={`Schedule session${props.recurring ? 's' : ''}`}
        />
      </form>
    </div>
  )
};

export default ScheduleForm;
