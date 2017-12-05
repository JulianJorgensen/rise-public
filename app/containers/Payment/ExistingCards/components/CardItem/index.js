import React from 'react';
import { firebase as fbConfig } from 'app/config';
import axios from 'axios';
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import Button from 'components/Button';
import classes from './index.css';

class CardItem extends React.Component {
  state = {
    deleting: false,
    deleted: false
  }

  deleteCard() {
    let { stripeCustomerId, id } = this.props;

    this.setState({
      deleting: true
    });

    axios.get(`${fbConfig.functions}/deleteCard`, {
        params: {
          stripeCustomerId: stripeCustomerId,
          cardId: id
        }
      })
      .then((res) => {
        this.setState({
          deleted: true
        });
      });
  }

  render() {
    let { deleted, deleting } = this.state;
    let { last4, name, exp_month, exp_year, id } = this.props;

    if (deleted) {
      return <div></div>
    }

    return (
      <Card className={classes.cardItem}>
        <CardTitle
          title={`XXXX XXXX XXXX ${last4}`}
          subtitle={`${exp_month}/${exp_year}`}
        />
        <CardText>{name}</CardText>
        <CardActions>
          {/*<Button icon='delete' label="Delete" disabled={deleting ? true : false} onClick={() => this.deleteCard.bind(this)} />*/}
        </CardActions>
      </Card>
    );
  }
};

export default CardItem;
