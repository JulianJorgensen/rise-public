import React, { Component, cloneElement, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import GetUserMeetings from './GetUserMeetings';
import GetAllMeetings from './GetAllMeetings';
import LoadingSpinner from 'components/LoadingSpinner';
import { isMentor, isAdmin } from 'utils/utils';

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
      return (
        <div>
          <GetUserMeetings isMentor={isMentor(account.role) ? true : false} />
          {isAdmin(account.role) ? <GetAllMeetings /> : '' }
        </div>
      )
    }else{
      return <div></div>
    }
  }
}
