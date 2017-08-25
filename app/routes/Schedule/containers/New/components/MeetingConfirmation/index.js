import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import axios from 'axios';
import moment from 'moment-timezone';
import _ from 'lodash';

import { isMentor, isAdmin } from 'utils/utils';

import * as utils from '../../../../utils/utils';
import TimezoneSelector from '../../../../components/TimezoneSelector';

import { Dialog } from 'react-toolbox/lib';
import LoadingSpinner from 'components/LoadingSpinner';
import Button from 'components/Button';
import classes from './index.css';

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class MeetingConfirmation extends Component {
  state = {
    isConfirming: false,
    location: ''
  }

  confirmMeeting = () => {
    let { account, selectedAthlete, recurring, selectedDate, selectedTime, onConfirm, dispatch } = this.props;

    this.setState({
      isConfirming: true
    });

    utils.confirmMeeting(
      selectedAthlete,
      selectedDate,
      selectedTime,
      account,
      recurring,
      dispatch
    ).then((confirmation) => {
      this.setState({
        isConfirming: false,
        location: confirmation.location
      }, () => {
        onConfirm();
      });
    });
  }

  render() {
    let { isConfirmed, showConfirmation, recurring, account, selectedAthlete, selectedDate, selectedTime, reset } = this.props;
    let { isConfirming, location } = this.state;
    let selectedAthleteAccount = selectedAthlete && account.athletes ? _.find(account.athletes, { 'uid': selectedAthlete }) : '';
    let firstName = isMentor(account.role) ? selectedAthleteAccount.firstName : account.mentor.firstName;

    if (isConfirmed) {
      return (
        <div className={classes.container}>
          <h2 className={classes.header}>Congratulations!</h2>
          <p>You're now scheduled for {recurring ? 'recurring sessions' : 'a session'} with {firstName} {recurring ? 'starting on' : 'on'}:</p>
          <div className={classes.confirmationDetails}>
            <div className={classes.time}>
              <div className={classes.time}><strong>{moment(selectedDate).format('MMMM Do YYYY')}</strong> at <strong>{moment(selectedTime).format('h:mma')}</strong></div>
            </div>
          </div>
          <Button
            label="Schedule another session"
            onClick={reset}
          />
        </div>
      )
    }

    return (
      <Dialog
        actions={[
          {
            icon: isConfirming ? <i className="fa fa-spinner fa-pulse fa-fw" /> : null,
            label: `Schedule session`,
            onClick: this.confirmMeeting,
            primary: true,
            className: `${classes.confirmButton} ${classes.button}`,
            disabled: isConfirming ? true : false
          }
        ]}
        active={showConfirmation}
        onEscKeyDown={this.handleHideConfirmationModal}
        onOverlayClick={this.handleHideConfirmationModal}
        title={`Confirm your session with ${selectedAthlete ? selectedAthleteAccount.firstName : account.mentor.firstName}`}
      >
        <div className={classes.confirmationDetails}>
          <div className={classes.time}><strong>{moment(selectedDate).format('MMMM Do YYYY')}</strong> at <strong>{moment(selectedTime).format('h:mma')}</strong></div>
          <TimezoneSelector />
        </div>
      </Dialog>
    )
  }
};
