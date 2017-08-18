import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import RadioGroup from 'components/RadioGroup';
import { BANKING_FORM_NAME } from 'app/constants';
import classes from './index.css';

export const MentorBankingForm = ({ account, handleBack, submitLabel, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <Field
      name='stripeEmail'
      component={TextField}
      label='Stripe email'
    />
    <div className={classes.ctas}>
      <Button
        primary
        label={submitLabel || 'Finish'}
        type='submit'
      />
    </div>
  </form>
)

MentorBankingForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: BANKING_FORM_NAME
})(MentorBankingForm)
