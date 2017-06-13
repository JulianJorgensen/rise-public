import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import Checkbox from 'react-toolbox/lib/checkbox';
import { RECOVER_PATH, LOGIN_FORM_NAME } from 'constants'
import TextField from 'components/TextField'
import { required, validateEmail } from 'utils/forms'
import classes from './LoginForm.css'

export const LoginForm = ({ handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='email'
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
      <RaisedButton
        label='Login'
        primary
        type='submit'
        disabled={submitting}
      />
    </div>
    <div className={classes.options}>
      <div className={classes.remember}>
        <Checkbox
          checked={true}
          disabled
          label="Remember"
        />
      </div>
      <Link className={classes.recover} to={RECOVER_PATH}>
        Forgot Password?
      </Link>
    </div>
  </form>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: LOGIN_FORM_NAME
})(LoginForm)
