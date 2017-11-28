import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';
import moment from 'moment-timezone';
import { Chip, Input, List, ListItem} from 'react-toolbox/lib';
import Dialog from 'components/Dialog';
import LoadingSpinner from 'components/LoadingSpinner';
import { isMentor, isAdmin } from 'utils/utils';

import * as utils from '../../utils/utils';

import classes from './index.css';

@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class AvailableTimes extends Component {
  state = {
    times: [],
    fetched: false
  }

  fetchAvailableTimes = () => {
    let { account, date } = this.props;
    let { mentor, timezone, role } = account;
    let acuityCalendarId = isMentor(role) ? account.acuityCalendarId : mentor.acuityCalendarId;

    utils.fetchAvailableTimes(date, acuityCalendarId, timezone).then((times) => {
      this.setState({
        times,
        fetched: true
      });
    });
  }

  componentWillUpdate(newProps) {
    let oldProps = this.props;
    if (newProps.show && !oldProps.show) {
      this.fetchAvailableTimes();
    }
  }

  render() {
    let { show, date, dateTime, handleClose, onSelect, onInputClick, account } = this.props;
    let { times, fetched } = this.state;

    let renderAvailableTimes = () => {
      if (times.length > 0) {
        return (
          <div>
            <div className={classes.times}>
              {times.map((item, index) => {
                let dateTime = item.time;
                return (
                  <Chip
                    key={index}
                    className={classes.time}
                    onClick={() => onSelect(dateTime)}
                  >{moment(dateTime).tz(account.timezone).format('h:mma')}</Chip>
                )
              })}
            </div>
          </div>
        )
      }else{
        return (
          <div>Sorry, there are no more available times for this day.</div>
        )
      }
    }

    return (
      <div>
        <Input
          type='text'
          label='Time'
          name='time'
          value={dateTime ? moment(dateTime).tz(account.timezone).format('h:mma') : ''}
          onClick={onInputClick}
          required
        />

        <Dialog
          actions={[
            { label: "Choose another day", onClick: handleClose }
          ]}
          active={show}
          onEscKeyDown={handleClose}
          onOverlayClick={handleClose}
          title={`Available Times for ${moment(date).format('MMMM Do YYYY')}`}
        >
          {fetched ? renderAvailableTimes() : <LoadingSpinner />}
        </Dialog>
      </div>
    )
  }
};
