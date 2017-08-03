import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import RadioGroup from 'components/RadioGroup';
import { BANKING_FORM_NAME } from 'app/constants';
import classes from './index.css';

export const BankingForm = ({ account, handleBack, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='payment.stripeEmail'
      component={TextField}
      label='Stripe email'
    />
    <div className={classes.ctas}>
      <Button
        label='Back'
        type='button'
        onClick={() => handleBack}
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
