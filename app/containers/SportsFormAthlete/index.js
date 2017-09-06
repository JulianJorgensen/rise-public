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
      name='what-sport-do-you-play'
      component={TextField}
      label='What Sport do you play?'
    />
    <Field
      name='why-olympian-mentor'
      component={TextField}
      label='Why do you seek a Mentor?'
      hint='Why do you feel that having an Olympian Mentor will propel you to the next level?'
      multiline
      rows={3}
    />
    <Field
      name='current-challenges'
      component={TextField}
      label='Current Challenges'
      multiline
      rows={3}
      hint='ex: Performance Anxiety, Low Confidence, Low Motivation, Expectation Control, Pressure, Fear of Failure'
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
      component={TextField}
      label='Favorite Activities outside of sport'
      hint='What are your favorite activites and/or extracurriculars outside of sport?'
      multiline={true}
      rows={3}
    />
    <Field
      name='mentor-preference'
      component={TextField}
      label='Do you have a preference of mentors?'
    />
    <div className={classes.ctas}>
      { handleBack ?
        <Button
          label='Back'
          type='button'
          onClick={handleBack}
        /> : '' }
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
