import React from 'react';
import classes from './index.css';

class CardItem extends React.Component {
  render() {
    let { last4 } = this.props;
    return (
      <div className={classes.cardItem}>
        <div>XXXX XXXX XXXX {last4}</div>
        <div>delete</div>
        <div>make primary</div>
      </div>
    );
  }
};

export default CardItem;
