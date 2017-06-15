import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from 'components/Button'
import TextField from 'components/TextField'
import { required, email } from 'utils/forms'
import { RECOVER_EMAIL_FORM_NAME } from 'constants'
import classes from './EmailForm.css'

export const EmailForm = ({ account, handleSubmit, submitting, pristine, valid }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Reset password</h4>
    <Field
      name='email'
      component={TextField}
      label='Email'
      required
    />
    <div className={classes.submit}>
      <Button
        label='Reset'
        primary
        type='submit'
        disabled={submitting}
      />
    </div>
  </form>
)

EmailForm.propTypes = {
  account: PropTypes.shape({
    providerData: PropTypes.array
  }),
  pristine: PropTypes.bool, // added by redux-form
  valid: PropTypes.bool, // added by redux-form
  handleSubmit: PropTypes.func.isRequired, // added by redux-form
  submitting: PropTypes.bool // added by redux-form
}

export default reduxForm({
  form: RECOVER_EMAIL_FORM_NAME
})(EmailForm)
