import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, validateEmail } from 'utils/forms';
import { ATHLETE_SIGNUP_FORM_NAME } from 'app/constants';
import { RadioGroup, RadioButton } from 'react-toolbox/lib/radio';
import Button from 'components/Button';
import TextField from 'components/TextField';
import classes from './AthleteSignupForm.css';

const AthleteSignupForm = ({ handleSubmit, submitting }) => {
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <Field
        name='email'
        type='text'
        component={TextField}
        label='Email'
        required
      />
      <Field
        name='password'
        component={TextField}
        label='Password'
        type='password'
        required
      />
      <div className={classes.submit}>
        <Button
          label='Signup'
          primary
          type='submit'
          disabled={submitting}
        />
      </div>
    </form>
  )
}

AthleteSignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: ATHLETE_SIGNUP_FORM_NAME
})(AthleteSignupForm)
