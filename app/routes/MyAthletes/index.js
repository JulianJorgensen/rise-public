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
@userHasPermission('my-athletes')
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class MyAthletes extends Component {
  state = {
    selected: '',
    sorted: 'asc',
    athletes: null
  };

  componentWillMount() {
    this.setState({ athletes: this.props.account.mentees });
  }

  getSortedData = () => {
    const compare = this.state.sorted === 'asc' ? sortByCaloriesAsc : sortByCaloriesDesc;
    return this.state.athletes.sort(compare);
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
    const { sorted } = this.state;
    const sortedData = this.getSortedData();
    return (
      <div>
        <h2>Your athletes</h2>
        <Table multiSelectable={false} onRowSelect={this.handleRowSelect} style={{ marginTop: 10 }}>
          <TableHead>
            <TooltipCell tooltip="This is a custom name the athlete choose">
              Displayname
            </TooltipCell>
            <TableCell onClick={this.handleSortClick} sorted={sorted}>First name</TableCell>
            <TableCell onClick={this.handleSortClick} sorted={sorted}>Last name</TableCell>
            <TableCell>Email</TableCell>
          </TableHead>
          {sortedData.map((item, idx) => (
            <TableRow key={idx} selected={this.state.selected.indexOf(item.displayName) !== -1}>
              <TableCell>{item.displayName}</TableCell>
              <TableCell>{item.firstName}</TableCell>
              <TableCell>{item.lastName}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    );
  }
}
