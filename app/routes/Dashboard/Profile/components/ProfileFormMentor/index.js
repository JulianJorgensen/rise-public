import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import CompetitionStatus from './components/CompetitionStatus';
import PreferredContactMethod from './components/PreferredContactMethod';
import DateOfBirth from 'components/DateOfBirth';
import CountryPicker from 'components/CountryPicker';
import countryList from 'country-list';
import StatePicker from 'components/StatePicker';
import RadioGroup from 'components/RadioGroup';
import classes from './index.css';

const countries = {};
countryList().getData().map((country) => {
  countries[country.code] = country.name
});

class ProfileForm extends Component {
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

  render() {
    let { account, handleAge, handleSubmit, submitting } = this.props;
    return (
      <form className={classes.container} onSubmit={handleSubmit}>
        <h2>You're awesome!</h2>
        <p>We want to know all about you! Use this profile space to edit your personal bio & more!</p>
        <Field
          name='firstName'
          component={TextField}
          label='First Name'
          required
        />
        <Field
          name='lastName'
          component={TextField}
          label='Last Name'
          required
        />
        <Field
          name='email'
          component={TextField}
          label='Email'
          required
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
          ageCallback={() => {}}
        />

        <Field
          name='address'
          component={TextField}
          label='Street Address'
          required
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
          required
        />
        <Field
          name='state'
          component={StatePicker}
          label='State / Province'
          country={this.state.country}
        />
        <Field
          name='zipcode'
          component={TextField}
          label='ZIP / Post Code'
          required
        />
        <Field
          name='sports'
          component={TextField}
          label='Your Sport(s)'
        />
        <Field
          name='years-competed'
          component={TextField}
          label='How many years did/have you competed?'
        />
        <Field
          name='competition-status'
          component={CompetitionStatus}
          label='Current Competition Status'
        />
        <Field
          name='olympics-competed-in'
          component={TextField}
          label='Olympics Competed In (Years)'
        />
        <Field
          name='medals-awards-received'
          component={TextField}
          label='Medals and Awards Received'
        />
        <Field
          name='education-university-attended'
          component={TextField}
          label='Education/University Attended'
        />
        <Field
          name='preferred-contact-method'
          component={PreferredContactMethod}
          label='Best way for my athletes to connect with me'
        />
        <Button
          primary
          label='Save'
          type='submit'
          className={classes.submit}
        />
      </form>
    )
  }
}

export default reduxForm({
  form: 'profileForm'
})(ProfileForm)
