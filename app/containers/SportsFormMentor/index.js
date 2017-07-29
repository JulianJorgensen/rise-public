import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import RadioGroup from 'components/RadioGroup';
import CompetitionStatus from './components/CompetitionStatus';
import PreferredContactMethod from './components/PreferredContactMethod';
import { SPORTS_FORM_NAME } from 'app/constants';
import classes from './index.css';

export const SportsFormMentor = ({ account, handleBack, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='sports'
      component={TextField}
      label='Your Sport(s)'
    />
    <Field
      name='years-competed'
      component={TextField}
      label='How many years did/have you competed?'
    />
    <Field
      name='competition-status'
      component={CompetitionStatus}
      label='Current Competition Status'
    />
    <Field
      name='olympics-competed-in'
      component={TextField}
      label='Olympics Competed In (Years)'
    />
    <Field
      name='medals-awards-received'
      component={TextField}
      label='Medals and Awards Received'
    />
    <Field
      name='education-university-attended'
      component={TextField}
      label='Education/University Attended'
    />
    <Field
      name='preferred-contact-method'
      component={PreferredContactMethod}
      label='Best way for my athletes to connect with me'
    />
    <div className={classes.ctas}>
      <Button
        label='Back'
        type='button'
        onClick={handleBack}
      />
      <Button
        primary
        label='Next'
        type='submit'
      />
    </div>
  </form>
)

SportsFormMentor.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: SPORTS_FORM_NAME
})(SportsFormMentor)
