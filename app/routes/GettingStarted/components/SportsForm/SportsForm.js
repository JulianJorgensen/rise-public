import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import RadioGroup from 'components/RadioGroup';
import { SPORTS_FORM_NAME } from 'constants';
import classes from './SportsForm.css';

export const SportsForm = ({ account, handleBack, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='sports'
      component={TextField}
      label='Sports'
    />
    <Field
      name='training-duration'
      component={TextField}
      label='Training Duration'
    />
    <Field
      name='awards'
      component={TextField}
      label='Have you won any awards or medals?'
      multiline={true}
    />
    <Field
      name='education'
      component={TextField}
      label='School, University, other training'
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

SportsForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: SPORTS_FORM_NAME
})(SportsForm)
