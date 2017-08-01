import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { firebase as fbConfig } from 'app/config';
import Button from 'components/Button';
import AddressSection from './AddressSection';
import CardItem from './CardItem';
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
class ExistingCards extends React.Component {
  state = {
    fetchedCards: false
  }

  getCards() {
    let { account } = this.props;
    if (account.payment) {
      let { stripeCustomerId } = account.payment;

      axios.get(`${fbConfig.functions}/getCards`, {
        params: {
          stripeCustomerId: stripeCustomerId
        }
      })
      .then((res) => {
        console.log('response: ', res);
        let cards = res.data.data;

        this.setState({
          fetchedCards: true,
          cards
        });
      });
    }
  }

  componentWillMount() {
    this.getCards();
  }

  render() {
    let { cards, fetchedCards } = this.state;

    if (!fetchedCards) {
      return (
        <div>
          getting cards...
        </div>
      );
    }

    return (
      <div>
        Current cards
        <ul className={classes.cards}>
          {cards.map((card, index) => {
            return <CardItem key={index} last4={card.last4} />
          })}
        </ul>
      </div>
    );
  }
}

export default injectStripe(ExistingCards);
