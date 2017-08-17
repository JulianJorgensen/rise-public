import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Tooltip from 'react-toolbox/lib/tooltip';
import Button from 'components/Button';
import TextField from 'components/TextField';
import RadioGroup from 'components/RadioGroup';
import { SPORTS_FORM_NAME } from 'app/constants';
import classes from './index.css';

export const SportsFormAthlete = ({ account, handleBack, handleSubmit, submitLabel, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='why-olympian-mentor'
      component={Tooltip(TextField)}
      label='Why do you seek a Mentor?'
      tooltip='Why do you feel that having an Olympian Mentor will propel you to the next level?'
      multiline
      rows={3}
    />
    <Field
      name='current-challenges'
      component={Tooltip(TextField)}
      label='Current Challenges'
      multiline
      rows={3}
      tooltip='ex: Performance Anxiety, Low Confidence, Low Motivation, Expectation Control, Pressure, Fear of Failure'
    />
    <Field
      name='achievements'
      component={TextField}
      label='What are your proudest achievements?'
      multiline={true}
      rows={3}
    />
    <Field
      name='things-you-love-about-yourself'
      component={TextField}
      label='What are 3 things do you love about yourself?'
      multiline={true}
      rows={3}
    />
    <Field
      name='favorite-activities'
      component={Tooltip(TextField)}
      label='Favorite Activities outside of sport'
      tooltip='What are your favorite activites and/or extracurriculars outside of sport?'
      multiline={true}
      rows={3}
    />
    <Field
      name='mentor-preference'
      component={TextField}
      label='Do you have a preference of mentors?'
    />
    <div className={classes.ctas}>
      <Button
        label='Back'
        type='button'
        onClick={handleBack}
      />
      <Button
        primary
        label={submitLabel || 'Next'}
        type='submit'
      />
    </div>
  </form>
)

SportsFormAthlete.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: SPORTS_FORM_NAME
})(SportsFormAthlete)
