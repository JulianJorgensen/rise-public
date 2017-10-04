import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { userIsAuthenticated, userHasPermission } from 'utils/router';

import ChooseDateTime from 'routes/schedule/components/ChooseDateTime';
import * as utils from 'routes/schedule/utils/utils';

import { Dialog } from 'react-toolbox/lib';

import Button from 'components/Button';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

@withRouter
@firebaseConnect()
@connect(
  ({ snackbar, meetings, firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    meetings,
    snackbar
  })
)
export default class Reschedule extends Component {
  state = {
    selectedDateTime: '',
    selectedDate: ''
  }

  handleSetDateTime = (dateTime) => {
    this.setState({
      selectedDateTime: dateTime
    });
  };

  handleSetDate = (date) => {
    this.setState({
      selectedDate: date
    });
  };

  handleSubmit = () => {
    let { selectedDateTime } = this.state;
    let { id, account, dispatch } = this.props;

    utils.rescheduleMeeting(id, selectedDateTime, account.timezone).then((confirmation) => {
        console.log('reschedule confirmed!', confirmation);
        this.props.handleClose();
        dispatch({
          type: 'SET_SNACKBAR',
          message: 'Your meeting was successfully rescheduled!',
          style: 'confirmation'
        });

        dispatch({
          type: 'MEETINGS_NEEDS_UPDATE',
          state: true
        });
      })
      .catch((error) => {
        console.log('error rescheduling meeting', error);
      });
  };

  render() {
    let { id, handleClose } = this.props;

    return (
      <Dialog
        actions={[
          { label: "Cancel", onClick: handleClose },
          { label: "Confirm", onClick: this.handleSubmit, primary: true }
        ]}
        active={id ? true : false}
        onEscKeyDown={handleClose}
        onOverlayClick={handleClose}
        title={`Re-schedule meeting`}
      >
        <div className={classes.container}>
          <form onSubmit={this.handleSubmit} className={classes.scheduleForm}>
            <ChooseDateTime
              onSetDateTime={this.handleSetDateTime}
              onSetDate={this.handleSetDate}
            />
          </form>
        </div>
      </Dialog>
    )
  }
};
