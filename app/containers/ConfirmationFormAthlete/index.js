import React, { PropTypes } from 'react';
import { Field, reduxForm } from 'redux-form';
import Button from 'components/Button';
import TextField from 'components/TextField';
import RadioGroup from 'components/RadioGroup';
import Checkbox from 'components/Checkbox';
import { CONFIRMATION_FORM_NAME } from 'app/constants';
import classes from './index.css';

export const ConfirmationFormAthlete = ({ account, handleBack, handleSubmit, submitting }) => (
  <form className={classes.container} onSubmit={handleSubmit}>
    <div className={classes.termsAndConditions}>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sit amet massa rhoncus, mattis risus vel, dictum justo. Donec nunc orci, euismod ut molestie eget, mollis et est. Phasellus rutrum lacus varius odio egestas, sit amet porta turpis vestibulum. Suspendisse neque velit, congue ut blandit ac, auctor sit amet augue. Nam fermentum tincidunt ligula, lacinia rhoncus enim eleifend in. Mauris tempus, sem quis mollis porttitor, erat leo fermentum odio, quis tempus elit enim a purus. Sed a magna ut sem ultricies euismod nec id est. Quisque interdum justo id tellus auctor, vitae gravida leo porttitor. Maecenas posuere arcu ut vestibulum dapibus. Nullam metus libero, pulvinar porta sodales id, condimentum at augue. Quisque aliquam erat dui, a finibus erat mollis in.</p>
      <p>Nam nec dapibus diam. Etiam ac euismod turpis. Donec a tempus erat. Pellentesque imperdiet dignissim mollis. Nam hendrerit laoreet justo vel vestibulum. Sed sodales nunc nec justo porttitor elementum. Mauris tempus gravida purus. Vivamus sed ipsum et dolor malesuada sagittis id in eros. Praesent dignissim massa massa, quis elementum magna sollicitudin ac. Nunc eu purus ac enim finibus tempor.</p>
      <p>Duis quis nisi efficitur, pulvinar tellus a, porta risus. Morbi eget odio pharetra, sodales nunc et, ultricies erat. Quisque metus elit, ultricies eu mollis id, pharetra consequat massa. Fusce purus neque, sollicitudin quis leo eu, vestibulum sagittis leo. Vestibulum mollis rhoncus lacus quis eleifend. Aenean augue mauris, tristique sed fermentum et, facilisis quis eros. Donec et sem metus. Morbi feugiat nisl tortor, a venenatis felis maximus vel. Suspendisse lectus nunc, tincidunt non suscipit non, porta eget eros.</p>
      <p>Etiam purus dui, vulputate maximus imperdiet vel, consectetur at metus. Suspendisse lobortis ex fermentum, sodales enim sit amet, euismod quam. Aliquam at felis quis ante vestibulum mattis porta in arcu. Donec vitae neque eros. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec pretium quam ac lorem fringilla laoreet. Cras imperdiet urna velit, molestie ullamcorper ante convallis sed. Sed elementum varius sem, sed suscipit lorem suscipit posuere. Vivamus egestas tortor tellus, malesuada ultricies enim laoreet id. Sed interdum ligula vel nisl vestibulum, id consectetur lacus elementum. Fusce commodo fermentum mi, id pulvinar dui tempor nec.</p>
      <p>Mauris libero sapien, egestas at ante nec, scelerisque blandit erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec congue dolor in lacus lacinia ornare. Morbi posuere nec ipsum quis sagittis. Aliquam erat volutpat. Donec non varius nibh. In et tincidunt lorem. Integer volutpat mi a consequat mollis. Cras ultrices varius erat lobortis ultricies. Mauris interdum interdum dui. Quisque ultrices lorem ac risus auctor posuere. In hac habitasse platea dictumst.</p>
    </div>
    <Field
      name='confirmed'
      component={Checkbox}
      label='I have read and understand all the terms and agreements'
    />
    <div className={classes.ctas}>
      <Button
        label='Back'
        type='button'
        onClick={() => handleBack}
      />
      <Button
        primary
        label='Confirm'
        type='submit'
      />
    </div>
  </form>
)

ConfirmationFormAthlete.propTypes = {
  account: PropTypes.object,
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: CONFIRMATION_FORM_NAME
})(ConfirmationFormAthlete)
