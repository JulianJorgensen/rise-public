import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, validateEmail } from 'utils/forms';
import { MENTOR_SIGNUP_FORM_NAME } from 'app/constants';
import Button from 'components/Button';
import TextField from 'components/TextField';
import classes from './MentorSignupForm.css';

const MentorSignupForm = ({ handleSubmit, submitting }) => {
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <h4>Mentor</h4>
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

MentorSignupForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: MENTOR_SIGNUP_FORM_NAME
})(MentorSignupForm)
