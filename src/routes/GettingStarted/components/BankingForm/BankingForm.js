import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import RadioGroup from 'components/RadioGroup';
import { BANKING_FORM_NAME } from 'constants';
import classes from './BankingForm.css';

export const BankingForm = ({ account, handleBack, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='payment.account-name'
      component={TextField}
      label='Name account is under'
    />
    <Field
      name='payment.banking-type'
      component={RadioGroup}
      inputs={[
        { label: 'Business', value: 'business' },
        { label: 'Personal', value: 'personal' }
      ]}
    />
    <Field
      name='payment.routing-number'
      component={TextField}
      label='Routing Number'
    />
    <Field
      name='payment.account-number'
      component={TextField}
      label='Account Number'
    />
    <Field
      name='payment.account-type'
      component={RadioGroup}
      inputs={[
        { label: 'Chequeing', value: 'chequeing' },
        { label: 'Savings', value: 'savings' }
      ]}
    />
    <div className={classes.ctas}>
      <Button
        label='Back'
        type='button'
        onClick={handleBack}
      />
      <Button
        primary
        label='Finish'
        type='submit'
      />
    </div>
  </form>
)

BankingForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: BANKING_FORM_NAME
})(BankingForm)
