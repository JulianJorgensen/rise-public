import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';
import { firebase as fbConfig } from 'app/config';
import Button from 'components/Button';
import AddressSection from './AddressSection';
import classes from './index.css';

@userIsAuthenticated
@userHasPermission('settings')
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
class AddCard extends React.Component {
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();

    let { uid, email, firstName, lastName, payment } = this.props.account;

    if (payment && payment.stripeCustomerId) {
      // add new card
    }else{
      // create new customer
    }

    this.props.stripe.createToken({
      name: `${firstName} ${lastName}`
    }).then(({token}) => {
      console.log('Received Stripe token:', token);

      axios.get(`${fbConfig.functions}/createStripeCustomer`, {
        params: {
          stripeToken: token.id,
          email: email,
          uid: uid
        }
      })
      .then((res) => {
        console.log('stripe response: ', res);
      });

      // trigger the parent form submit
      if (this.props.onSubmit) {
        this.props.onSubmit();
      }
    });

    // However, this line of code will do the same thing:
    // this.props.stripe.createToken({type: 'card', name: 'Jenny Rosen'});

  }

  render() {
    let { handleBack, hasBackButton, submitLabel } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <label className={classes.cardLabel}>
          Add a new card
          <div className={classes.card}>
            <CardElement style={{base: {fontSize: '18px'}}} />
          </div>
        </label>
        <small>We use Stripe for increased security.</small>

        <div className={classes.ctas}>
          {hasBackButton ?
            <Button
              label='Back'
              type='button'
              onClick={handleBack}
            /> : ''}

          <Button
            primary
            label={submitLabel ? submitLabel : 'Add card'}
            type='submit'
          />
        </div>
      </form>
    );
  }
}

export default injectStripe(AddCard);
