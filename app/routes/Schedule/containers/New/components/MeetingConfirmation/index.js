import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import axios from 'axios';
import moment from 'moment-timezone';
import _ from 'lodash';

import { isMentor, isAdmin } from 'utils/utils';

import * as utils from '../../../../utils/utils';

import { Dialog } from 'react-toolbox/lib';
import TimezoneDisplay from 'components/TimezoneDisplay';
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
    let { account, selectedAthlete, recurring, selectedDateTime, onConfirm, dispatch } = this.props;

    let selectedAthleteAccount = selectedAthlete && account.athletes ? _.find(account.athletes, { 'uid': selectedAthlete }) : '';
    let acuityAccount = isMentor(account.role) && selectedAthleteAccount ? selectedAthleteAccount : account;

    this.setState({
      isConfirming: true
    });

    utils.confirmMeeting(
      selectedAthlete,
      selectedDateTime,
      account,
      acuityAccount,
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
    let { isConfirmed, showConfirmation, handleHideConfirmation, recurring, account, selectedAthlete, selectedDateTime, reset } = this.props;
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
              <div className={classes.time}><strong>{moment(selectedDateTime).tz(account.timezone).format('MMMM Do YYYY')}</strong> at <strong>{moment(selectedDateTime).tz(account.timezone).format('h:mma')}</strong></div>
            </div>
            <TimezoneDisplay />
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
            label: `Cancel`,
            onClick: handleHideConfirmation,
            className: `${classes.button}`
          },
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
        onEscKeyDown={handleHideConfirmation}
        onOverlayClick={handleHideConfirmation}
        title={`Confirm your session with ${isMentor(account.role) ? selectedAthleteAccount ? selectedAthleteAccount.firstName : 'your athlete' : account.mentor.firstName}`}
      >
        <div className={classes.confirmationDetails}>
          <div className={classes.time}><strong>{moment(selectedDateTime).tz(account.timezone).format('MMMM Do YYYY')}</strong> at <strong>{moment(selectedDateTime).tz(account.timezone).format('h:mma')}</strong></div>
        </div>
        <TimezoneDisplay />
      </Dialog>
    )
  }
};
