import React from 'react';
import classes from './index.css';

export default class NotAuthorized extends React.Component {
  render() {
    return (
      <div className={classes.container}>
        <h1>You are not authorized to see this page.</h1>
      </div>
    )
  }
}
