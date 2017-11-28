import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { injectStripe, CardElement } from 'react-stripe-elements';
import axios from 'axios';
import { firebase as fbConfig } from 'app/config';
import Button from 'components/Button';
import Address from '../Address';
import classes from './index.css';

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
class AddCard extends React.Component {
  state = {
    submitting: false
  };

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    this.setState({
      submitting: true
    });

    let { uid, email, firstName, lastName, stripeCustomerId } = this.props.account;

    if (stripeCustomerId) {
      // add new card
      this.props.stripe.createToken({
        name: `${firstName} ${lastName}`
      }).then(({ token }) => {
        console.log('Customer exists, adding new card');
        console.log('Received Stripe token:', token);

        axios.get(`${fbConfig.functions}/addCard`, {
            params: {
              stripeToken: token.id,
              stripeCustomerId: stripeCustomerId
            }
          })
          .then((res) => {
            console.log('stripe response: ', res);
            this.props.triggerUpdate();
            this.setState({
              submitting: false
            });
          });

        // trigger the parent form submit
        if (this.props.onSubmit) {
          this.props.onSubmit();
        }
      });

    } else {
      // create new customer
      this.props.stripe.createToken({
        name: `${firstName} ${lastName}`
      }).then(({ token }) => {
        console.log('creating new customer');
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
    }
  }

  render() {
    let { submitting } = this.state;
    let { submitLabel } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        {/* <AddressSection /> */}
        <label className={classes.cardLabel}>
          <h5>Add a new card</h5>
          <div className={classes.card}>
            <CardElement style={{base: {fontSize: '18px'}}} />
          </div>
        </label>
        <small>We use Stripe for increased security.</small>

        <div className={classes.ctas}>
          <Button
            primary
            label={submitLabel ? submitLabel : submitting ? 'Adding card' : 'Add card'}
            disabled={submitting ? true : false}
            type='submit'
          />
        </div>
      </form>
    );
  }
}

export default injectStripe(AddCard);
