import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import { ACCOUNT_FORM_NAME } from 'app/constants';
import ProviderDataForm from '../ProviderDataForm';
import classes from './ProfileForm.css';

export const AccountForm = ({ account, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <h2>You're awesome!</h2>
    <p>We want to know all about you! Use this profile space to edit your personal bio & more!</p>
    <Field
      name='firstName'
      component={TextField}
      label='First Name'
    />
    <Field
      name='lastName'
      component={TextField}
      label='Last Name'
    />
    <Field
      name='bio'
      component={TextField}
      label='Bio'
      rows={3}
      multiline
    />
    {
      !!account && !!account.providerData &&
        <div>
          <h4>Linked Accounts</h4>
          <ProviderDataForm
            providerData={account.providerData}
          />
        </div>
    }
    <Button
      primary
      label='Save'
      type='submit'
      className={classes.submit}
    />
  </form>
)

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: ACCOUNT_FORM_NAME
})(AccountForm)
