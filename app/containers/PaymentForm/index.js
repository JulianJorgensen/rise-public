import React from 'react';
import { Elements } from 'react-stripe-elements';
import ExistingCards from './components/ExistingCards';
import AddCard from './components/AddCard';

export default class PaymentForm extends React.Component {
  render() {
    return (
      <Elements>
        <div>
          <ExistingCards />
          <AddCard {...this.props} />
        </div>
      </Elements>
    );
  }
}
