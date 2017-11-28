import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import moment from 'moment-timezone';

import { Table, TableHead, TableRow, TableCell, Tooltip } from 'react-toolbox/lib';
import {IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu';
import Dialog from 'components/Dialog';
import Autocomplete from 'react-toolbox/lib/autocomplete';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

import Status from './components/Status';

import { isMentor } from 'utils/utils';
import { getAttendeesFromMeeting } from 'utils/meetings';

const TooltipCell = Tooltip(TableCell);

// icons
import 'assets/icons/regular/trash.svg';

@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth'),
  })
)
export default class UsersItems extends Component {
  state = {
    userData: null,
    showModal: false,
    showPairModal: false
  }

  handleRowSelect = selectedRow => {
    this.showUserData(selectedRow);
  };

  showUserData = (user) => {
    this.setState({
      showModal: true,
      userData: user
    });
  };

  pairAthleteWithMentor = () => {
    let { userData, selectedMentor } = this.state;
    let athleteUid = userData.uid;

    this.setState({
      pairing: true
    });

    console.log(`paring athlete ${athleteUid} with mentor ${selectedMentor}...`);
    axios.get(`${fbConfig.functions}/pairAthleteWithMentor`, {
      params: {
        athleteUid: athleteUid,
        mentorUid: selectedMentor
      }
    })
    .then((response) => {
      console.log(response);
      this.setState({
        showPairModal: false,
        pairing: false,
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  handleMentorChange = (mentor) => {
    console.log('changing mentor', mentor);
    this.setState({
      selectedMentor: mentor
    })
  }

  showPairModal = (user) => {
    this.setState({
      userData: user,
      selectedMentor: user.mentor || '',
      showPairModal: true
    });
  }

  deleteUser = ({ uid }) => {
    let confirmed = confirm(`Are you sure you want to delete the user with UID ${uid}?`);

    if (confirmed) {
      axios.get(`${fbConfig.functions}/deleteUser`, {
        params: {
          uid: uid
        }
      })
      .then((response) => {
        console.log('successfully deleted user ', response);
        let userIndex = this.props.data.indexOf(uid);
        if (userIndex > -1) {
          this.props.data.splice(userIndex, 1);
        }
      })
      .catch((error) => {
        console.log('error deleting user ', error);
      });
    }
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      showPairModal: false,
      showDeleteConfirmationModal: false
    });
  }

  getAllMentors = () => {
    let { users } = this.props;
    let allMentorsArr = _.filter(users, (user) => {
      return user.role === 'mentor' || user.role === 'admin';
    });

    let allMentors = {};
    allMentorsArr.map((mentor) => {
      allMentors[mentor.uid] = `${mentor.firstName} ${mentor.lastName}`;
    });

    return allMentors;
  }

  render() {
    let { data } = this.props;
    let { userData, showModal, showPairModal, selectedMentor, showDeleteConfirmationModal } = this.state;

    let items = data.map((user, index) => {
      return (
        <TableRow key={index} selectable={false}>
          <Status user={user} />
          <TableCell><div>{user.role}</div></TableCell>
          <TableCell><div>{user.firstName}</div></TableCell>
          <TableCell><div>{user.lastName}</div></TableCell>
          <TableCell><div>{user.email}</div></TableCell>
          <TableCell>
            <div>
              <IconMenu icon='more_vert' position='topRight' menuRipple>
                { user.role === 'athlete' || user.role === 'athlete-pending' ? <MenuItem icon='compare_arrows' caption='Pair with Mentor' onClick={() => this.showPairModal(user)} /> : <MenuItem icon='compare_arrows' disabled caption='Pair with Athlete' /> }
                <MenuItem icon='assignment_ind' caption='See details' onClick={() => this.showUserData(user)} />
                <MenuDivider />
                <MenuItem icon='delete' caption='Delete' onClick={() => this.deleteUser(user)} />
              </IconMenu>
            </div>
          </TableCell>
        </TableRow>
      )
    })

    return (
      <div>
        <Table selectable={false}>
          <TableHead>
            <TableCell><div>Status</div></TableCell>
            <TableCell><div>Role</div></TableCell>
            <TableCell><div>First name</div></TableCell>
            <TableCell><div>Last name</div></TableCell>
            <TableCell><div>Email</div></TableCell>
            <TableCell><div> </div></TableCell>
          </TableHead>
          {items}
        </Table>

        <Dialog
          actions={[
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
            { label: "Pair", onClick: this.pairAthleteWithMentor, disabled: this.state.pairing, primary: true}
          ]}
          active={showPairModal}
          onEscKeyDown={this.closeModal}
          onOverlayClick={this.closeModal}
          title='Pair Athlete with Mentor'
          className={classes.pairModal}
        >
          <div>
            <Autocomplete
              direction='down'
              selectedPosition='none'
              label='Choose Mentor'
              showSuggestionsWhenValueIsSet={true}
              suggestionMatch='anywhere'
              onChange={this.handleMentorChange}
              multiple={false}
              source={this.getAllMentors()}
              value={selectedMentor}
              className={classes.mentorList}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}
