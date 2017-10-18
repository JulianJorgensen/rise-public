import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebase as fbConfig } from 'app/config';
import { TableCell, Tooltip } from 'react-toolbox/lib';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

const TooltipCell = Tooltip(TableCell);

export default class UsersItemsStatus extends Component {
  state = {}

  toggleApplicationStatus = () => {
    let { user } = this.props;

    if (user.role === 'admin'){
      return false;
    }

    this.setState({
      changingApplicationStatus: true
    });

    axios.get(`${fbConfig.functions}/changeApplicationStatus`, {
      params: {
        uid: user.uid,
        newStatus: !user.applicationApproved
      }
    })
    .then((response) => {
      console.log('successfully toggled user status ', response);
      this.setState({
        changingApplicationStatus: false
      });

      if (!user.applicationApproved) {
        if(confirm('Send welcome email?')){
          // send welcome email to user
          axios.post(`${fbConfig.functions}/sendEmail`, {
            toName: user.firstName,
            toEmail: user.email,
            subject: `Congratulations ${user.firstName}!`,
            template: 'applicationApproval.pug'
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log('Error sending welcome email: ', error);
          });          
        }
      }
    })
    .catch((error) => {
      console.log('error toggling user status ', error);
    });
  }

  render() {
    let { user } = this.props;
    if (!user.hasSubmittedApplication) {
      return (
        <TableCell><div>Not yet submitted</div></TableCell>          
      )
    }

    if (this.state.changingApplicationStatus) {
      return (
        <TableCell><div><LoadingSpinner small /></div></TableCell>
      )
    }

    return (
      <TooltipCell tooltip="Click to toggle status">
        <div className={classes.applicationStatus} onClick={() => this.toggleApplicationStatus()}>{user.applicationApproved ? 'Approved' : 'Pending'}</div>
      </TooltipCell>
    )
  }
}
