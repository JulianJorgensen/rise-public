import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import { SETTINGS_FORM_NAME } from 'app/constants';
import ProviderDataForm from '../ProviderDataForm';
import classes from './SettingsForm.css';

export const SettingsForm = ({ account, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h4>Settings</h4>
    <Field
      name='role.name'
      component={TextField}
      label='Role'
      disabled
    />
    <Field
      name='email'
      component={TextField}
      label='Email'
    />
    <Field
      name='address'
      component={TextField}
      label='Address'
    />
    <Field
      name='phone'
      component={TextField}
      label='Phone'
    />
    <Button
      primary
      label='Save'
      type='submit'
      className={classes.submit}
    />
  </form>
)

SettingsForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: SETTINGS_FORM_NAME
})(SettingsForm)
