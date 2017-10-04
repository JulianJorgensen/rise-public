import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isLoaded, isEmpty } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import { injectStripe } from 'react-stripe-elements';
import axios from 'axios';
import { firebase as fbConfig } from 'app/config';
import LoadingSpinner from 'components/LoadingSpinner';
import Button from 'components/Button';
import CardItem from './components/CardItem';
import classes from './index.css';

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
    let { stripeCustomerId } = account;

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

  componentWillMount() {
    this.getCards();
  }

  componentWillReceiveProps(props) {
    console.log('existing cards receiving props', props);
    this.setState({
      fetchedCards: false
    });
    this.getCards();
  }

  render() {
    let { cards, fetchedCards } = this.state;
    let { account } = this.props;

    if (!fetchedCards) {
      return (
        <LoadingSpinner />
      );
    }

    if (!cards || cards.length < 1) {
      return (
        <div className={classes.cards}>
          You haven't added any cards yet.
        </div>
      )
    }

    return (
      <div className={classes.cards}>
        <h5>Current active {cards.length > 1 ? 'cards' : 'card'}</h5>
        <div>
          {cards.map((card, index) => {
            return (
              <CardItem
                key={index}
                last4={card.last4}
                name={card.name}
                id={card.id}
                exp_month={card.exp_month}
                exp_year={card.exp_year}
                stripeCustomerId={account.stripeCustomerId}
              />
            )
          })}
        </div>
      </div>
    );
  }
}

export default injectStripe(ExistingCards);
