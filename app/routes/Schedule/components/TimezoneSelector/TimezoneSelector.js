import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import moment from 'moment-timezone';
import {Dropdown} from 'react-toolbox/lib';
import Button from 'components/Button';
import classes from './TimezoneSelector.css';

import timezoneData from '../Timezones';
let timezones = Object.entries(timezoneData).map((item) => {
  let timezoneName = item[0];
  let timezoneId = item[1];
  return ({
    value: timezoneName,
    label: `${timezoneName} (${moment().tz(timezoneName).format('Z')})`
  })
});

@firebaseConnect() // add this.props.firebase
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: dataToJS(firebase, 'profile')
  })
)
export default class TimezoneSelector extends Component {
  state = {
    timezone: this.props.account.timezone ? this.props.account.timezone : moment.tz.guess(),
    selectable: false
  }

  static propTypes = {
    account: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    firebase: PropTypes.shape({
      update: PropTypes.func.isRequired
    })
  }

  handleTimezoneChange = (timezone) => {
    this.setState({timezone});
  }

  setNewTimezone = () => {
    this.setState({selectable: false});

    // update account on firebase
    this.props.firebase
      .update(`${rfConfig.userProfile}/${this.props.auth.uid}`, {
        timezone: this.state.timezone
      })
      .catch((err) => {
        console.error('Error updating account timezone', err) // eslint-disable-line no-console
      })
  }

  render() {
    let {timezone, selectable} = this.state;
    let {changeable} = this.props;
    if (selectable){
      return (
        <div className={classes.selector}>
          <Dropdown
            auto
            onChange={this.handleTimezoneChange}
            className={classes.dropdown}
            source={timezones}
            value={timezone}
            required
          />
          <Button
            floating
            mini
            onClick={() => this.setState({selectable: false})}
          ><i className="fa fa-times" /></Button>
          <Button
            floating
            mini
            onClick={this.setNewTimezone}
          ><i className="fa fa-check" /></Button>
        </div>
      )
    }else{
      return (
        <div className={classes.container} onClick={() => changeable ? this.setState({selectable: true}) : ''}>
          <div>Times are in {timezone} {moment.tz(timezone).format('z')}. Current local time: {moment().tz(timezone).format('h:mma')}.</div>
          {changeable ? <div><a href="#">Change timezone</a></div> : ''}
        </div>
      )
    }
  }
}
