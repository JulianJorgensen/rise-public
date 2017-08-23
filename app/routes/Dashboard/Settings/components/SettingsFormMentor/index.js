import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import { SETTINGS_FORM_NAME } from 'app/constants';
import ProviderDataForm from '../ProviderDataForm';
import classes from './index.css';

export const SettingsFormMentor = ({ account, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
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
    <Field
      name='acuityCalendarId'
      component={TextField}
      label='Acuity Calendar ID'
    />
    <Button
      primary
      label='Save'
      type='submit'
      className={classes.submit}
    />
  </form>
)

export default reduxForm({
  form: SETTINGS_FORM_NAME
})(SettingsFormMentor)
