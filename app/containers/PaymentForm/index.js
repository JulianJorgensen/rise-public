import React from 'react';
import { Elements } from 'react-stripe-elements';
import ExistingCards from './components/ExistingCards';
import AddCard from './components/AddCard';

export default class PaymentForm extends React.Component {
  render() {
    let { showCards } = this.props;

    return (
      <Elements>
        <div>
          { showCards ? <ExistingCards /> : '' }
          <AddCard {...this.props} />
        </div>
      </Elements>
    );
  }
}
