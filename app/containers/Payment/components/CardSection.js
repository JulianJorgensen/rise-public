// CardSection.js
import React from 'react';
import {CardElement} from 'react-stripe-elements';
import classes from './index.css';

class CardSection extends React.Component {
  render() {
    return (
      <label>
        Card details
        <div className={classes.card}>
          <CardElement style={{base: {fontSize: '18px'}}} />
        </div>
      </label>
    );
  }
};

export default CardSection;
