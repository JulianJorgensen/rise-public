import React, { PropTypes, Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import DateOfBirth from 'components/DateOfBirth';
import CountryPicker from 'components/CountryPicker';
import countryList from 'country-list';
import StatePicker from 'components/StatePicker';
import RadioGroup from 'components/RadioGroup';
import { ACCOUNT_FORM_NAME } from 'app/constants';
import ProviderDataForm from '../ProviderDataForm';
import classes from './AccountForm.css';

const countries = countryList().getData().map((country) => {
  return {
    value: country.code,
    label: country.name
  }
});

class AccountForm extends Component {
  state = {
    age: '',
    country: 'US'
  }

  handleCountryChange = (country) => {
    this.setState({country});
  };

  handleAge = (age) => {
    this.setState({age});
  }

  render(){
    let { account, handleAge, handleSubmit, submitting } = this.props;

    let renderParentFields = () => {
      return (
        <div>
          <p>It looks like you are under 16! We're going to need your parent's or guardians' contact info</p>
          <Field
            name='parent.first-name'
            component={TextField}
            label='Parent / Guardian First Name'
          />
          <Field
            name='parent.last-name'
            component={TextField}
            label='Parent / Guardian Last Name'
          />
        </div>
      )
    };

    return (
      <form className={classes.container} onSubmit={handleSubmit}>
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
          name='email'
          component={TextField}
          label='Email'
        />
        <Field
          name='phone'
          component={TextField}
          label='Phone Number'
          required
        />
        <Field
          name='birthday'
          component={DateOfBirth}
          label='Date of birth'
          ageCallback={this.handleAge}
        />

        {this.state.age && (this.state.age <= 16) ? renderParentFields() : ''}

        <Field
          name='address'
          component={TextField}
          label='Street Address'
        />
        <Field
          name='city'
          component={TextField}
          label='City'
          required
        />
        <Field
          name='country'
          component={CountryPicker}
          handleCountryChange={this.handleCountryChange}
          country={this.state.country}
          countries={countries}
          label='Country'
        />
        <Field
          name='state'
          component={StatePicker}
          label='State / Province'
          country={this.state.country}
          required
        />
        <Field
          name='zipcode'
          component={TextField}
          label='ZIP / Post Code'
          required
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
        <div className={classes.ctas}>
          <Button
            primary
            label='Next'
            type='submit'
          />
        </div>
      </form>
    )
  }
}

AccountForm.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: ACCOUNT_FORM_NAME
})(AccountForm)