import React, { Component, PropTypes } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './index.css';

@withRouter
@connect(
  ({ notification }) => ({
    notification
  })
)
export default class TopNotification extends Component {
  handleNotificationClick = () => {
    let url = this.props.notification.url;
    if(!url){return false}

    this.handleCloseNotification();
    this.props.history.push(url)
  }

  handleCloseNotification = (e) => {
    this.props.dispatch({ type: 'CLOSE_NOTIFICATION' });
  }

  render() {
    let { notification } = this.props;

    if (notification) {
      if (notification.show) {
        return (
          <div
            className={`${classes.container} ${notification.style === 'error' ? classes.error : notification.style === 'success' ? classes.success : classes.default }`}
            onClick={() => this.handleNotificationClick() }
          >
            {notification.message} <a onClick={(e) => {
              e.stopPropagation();
              this.handleCloseNotification();
            }} className={classes.close}><i className="fa fa-times" /></a>
          </div>
        )
      }else{
        return (
          <div></div>
        )
      }
    }else{
      return (<div></div>)
    }
  }
}
