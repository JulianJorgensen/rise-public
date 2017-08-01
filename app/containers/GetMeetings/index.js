import React, { Component, cloneElement, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import UserMeetings from './UserMeetings';
import AllMeetings from './AllMeetings';
import LoadingSpinner from 'components/LoadingSpinner';

@userIsAuthenticated
@firebaseConnect()
@connect(
  ({ notification, firebase, meetings }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
    meetings
  })
)
export default class GetMeetings extends Component {
  static propTypes = {
    account: PropTypes.object,
    firebase: PropTypes.object.isRequired
  }

  render () {
    let { account } = this.props;

    if (!isEmpty(account) && isLoaded(account)) {
      let { mentees, role } = account;

      // is a mentor
      if (role.name === 'mentor') {
        return (
          <UserMeetings isMentor={true} />
        )
      }

      // FOR ADMINS ONLY
      let isAdmin = role.name === 'admin' ? true : false;
      if (isAdmin) {
        return (
          <AllMeetings />
        )
      }

      return (
        <UserMeetings />
      )
    }else{
      return <div></div>
    }
  }
}
