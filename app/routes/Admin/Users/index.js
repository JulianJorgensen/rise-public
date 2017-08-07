import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'
import { Table, TableHead, TableRow, TableCell, Tooltip } from 'react-toolbox/lib';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

const TooltipCell = Tooltip(TableCell);

const sortByCaloriesAsc = (a, b) => {
  if (a.calories < b.calories) return -1;
  if (a.calories > b.calories) return 1;
  return 0;
};

const sortByCaloriesDesc = (a, b) => {
  if (a.calories > b.calories) return -1;
  if (a.calories < b.calories) return 1;
  return 0;
};


@userIsAuthenticated
@userHasPermission('admin')
@firebaseConnect([
  'users'
])
@connect(
  ({ firebase }) => ({
    users: dataToJS(firebase, 'users')
  })
)
export default class Users extends Component {
  static propTypes = {
    users: PropTypes.object,
    firebase: PropTypes.object
  }

  state = {
    selected: '',
    sorted: 'asc',
    users: []
  };

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByCaloriesAsc : sortByCaloriesDesc;
    let users = this.props.users;
    return users.sort(compare);
  }

  handleRowSelect = selected => {
    const sortedData = this.getSortedData();
    this.setState({ selected: selected.map(item => sortedData[item].name) });
  };

  handleSortClick = () => {
    const { sorted } = this.state;
    const nextSorting = sorted === 'asc' ? 'desc' : 'asc';
    this.setState({ sorted: nextSorting });
  };

  render () {
    let { users } = this.props;

    if(!users){
      return (
        <LoadingSpinner />
      )
    }

    const { sorted } = this.state;
    // const sortedData = this.getSortedData();

    return (
      <div>
        <h2>All users</h2>
        <Table onRowSelect={() => this.handleRowSelect} style={{ marginTop: 10 }}>
          <TableHead multiSelectable={false}>
            <TableCell>Role</TableCell>
            <TableCell onClick={() => this.handleSortClick} sorted={sorted}>First name</TableCell>
            <TableCell onClick={() => this.handleSortClick} sorted={sorted}>Last name</TableCell>
            <TableCell>Email</TableCell>
          </TableHead>
          { Object.keys(users).map(
              (user, id) => (
                <TableRow key={id}>
                  <TableCell><div>{users[user].role}</div></TableCell>
                  <TableCell><div>{users[user].firstName}</div></TableCell>
                  <TableCell><div>{users[user].lastName}</div></TableCell>
                  <TableCell><div>{users[user].email}</div></TableCell>
                </TableRow>
              )
            )
          }
        </Table>
      </div>
    );
  }
}
