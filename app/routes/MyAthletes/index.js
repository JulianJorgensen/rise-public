import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'
import { Table, TableHead, TableRow, TableCell, Tooltip } from 'react-toolbox/lib';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';

const TooltipCell = Tooltip(TableCell);

@userIsAuthenticated
//@userHasPermission('my-athletes')
@firebaseConnect()
@connect(
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class MyAthletes extends Component {
  state = {
    athletes: null
  };

  render () {
    let { account } = this.props;

    if(!account) {
      return <LoadingSpinner />
    }

    if (!account.athletes) {
      return (
        <div className={classes.container}>
          <h4>You currently don't have any athletes assigned.</h4>
        </div>
      )
    }

    return (
      <div>
        <h2>My Athletes</h2>
        <p>Here is the list of all the atheletes you are currently assigned to mentor. Want to know their story? View their profile.</p>

        <Table multiSelectable={false} selectable={false} style={{ marginTop: 10 }}>
          <TableHead>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Email</TableCell>
          </TableHead>
          {account.athletes.map((athlete, idx) => (
            <TableRow key={idx} selectable={false}>
              <TableCell><div>{athlete.firstName}</div></TableCell>
              <TableCell><div>{athlete.lastName}</div></TableCell>
              <TableCell><div>{athlete.email}</div></TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    );
  }
}
