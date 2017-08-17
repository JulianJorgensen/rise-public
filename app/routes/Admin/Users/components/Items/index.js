import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import moment from 'moment-timezone';
import { Table, TableHead, TableRow, TableCell, Tooltip } from 'react-toolbox/lib';
import { Dialog } from 'react-toolbox/lib/dialog';
import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

import { getAttendeesFromMeeting } from 'utils/utils';

const TooltipCell = Tooltip(TableCell);

// icons
import 'assets/icons/regular/trash.svg';

@userIsAuthenticated
@userHasPermission('admin')
@firebaseConnect([
  'users'
])
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
    users: dataToJS(firebase, 'users')
  })
)
export default class UsersItems extends Component {
  state = {
    userData: null,
    showModal: false,
    showDeleteConfirmationModal: false
  }

  handleRowSelect = selectedRow => {
    this.showUserData(selectedRow);
  };

  showUserData = selectedRow => {
    let visibleUsers = this.props.data;
    let userId = visibleUsers[selectedRow];
    let { users } = this.props;
    let user = _.find(users, { 'uid': userId });

    this.setState({
      showModal: true,
      userData: user
    });
  };

  toggleUserStatus = (uid) => {
    let { users } = this.props;
    let user = users[uid];

    if (user.role === 'admin'){
      return false;
    }

    let applicationIsPending = user.applicationApproved;
    let newRole = applicationPending ? user.role.replace(`-${PENDING}`, '') : user.role.concat(`-${PENDING}`);

    axios.get(`${fbConfig.functions}/changeUserStatus`, {
      params: {
        uid: uid,
        newStatus: !applicationIsPending,
        newRole: newRole
      }
    })
    .then((response) => {
      console.log('successfully toggled user status ', response);
    })
    .catch((error) => {
      console.log('error toggling user status ', error);
    });
  }

  showDeleteConfirmationModal = () => {
    this.setState({
      showModal: false,
      showDeleteConfirmationModal: true
    });
  }

  deleteUser = () => {
    let { userData } = this.state;
    console.log('user data', userData);

    axios.get(`${fbConfig.functions}/deleteUser`, {
      params: {
        uid: userData.uid
      }
    })
    .then((response) => {
      console.log('successfully deleted user ', response);
    })
    .catch((error) => {
      console.log('error deleting user ', error);
    });

    this.setState({
      showDeleteConfirmationModal: false
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      showDeleteConfirmationModal: false
    });
  }

  render() {
    let { data, users } = this.props;
    let { userData, showModal, showDeleteConfirmationModal } = this.state;

    let items = data.map((user, index) => {
      return (
        <TableRow key={index}>
          <TooltipCell tooltip="Click to toggle status">
            <div className={classes.userStatus} onClick={() => this.toggleUserStatus(user)}>{users[user].role}</div>
          </TooltipCell>
          <TableCell><div>{users[user].firstName}</div></TableCell>
          <TableCell><div>{users[user].lastName}</div></TableCell>
          <TableCell><div>{users[user].email}</div></TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        <Table onRowSelect={this.handleRowSelect}>
          <TableHead>
            <TableCell>Role</TableCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Email</TableCell>
          </TableHead>
          {items}
        </Table>

        <Dialog
          actions={[
            { label: "Delete user", onClick: this.showDeleteConfirmationModal },
            { label: "Close", onClick: this.closeModal, primary: true }
          ]}
          active={showModal}
          onEscKeyDown={this.closeModal}
          onOverlayClick={this.closeModal}
          title='User Data'
        >
          <div className={classes.userData}>
          {userData ?
            Object.entries(userData).map(([key, value]) => {
              if(value !== null){
                if (typeof value === 'object') {
                  return (<div key={key}>{key}: {
                    Object.entries(value).map(([objKey, objValue]) => {
                      return (<div key={objKey}>{objKey}: {objValue}</div>);
                    })
                  }</div>)
                }else{
                  return (<div key={key}>{key}: {value}</div>)
                }
              }
            }) : ''}
          </div>
        </Dialog>

        <Dialog
          actions={[
            { label: "Cancel", onClick: this.closeModal },
            { label: "Confirm", onClick: this.deleteUser, primary: true }
          ]}
          active={showDeleteConfirmationModal}
          onEscKeyDown={this.closeModal}
          onOverlayClick={this.closeModal}
          title='Confirm Delete User'
        >
          {userData ?
            <div>
              Are you sure you want to delete {userData.firstName} ({userData.email}) entirely?
            </div> : ''}
        </Dialog>
      </div>
    )
  }
}
