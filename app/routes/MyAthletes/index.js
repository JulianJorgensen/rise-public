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
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class MyAthletes extends Component {
  state = {
    athletes: null
  };

  componentWillReceiveProps(props) {
    if(props.account) {
      this.setState({ athletes: props.account.athletes });
    }
  }

  render () {
    let { account } = this.props;

    if(!account) {
      return <LoadingSpinner />
    }

    const { athletes } = this.state;

    if (!athletes) {
      return (
        <div className={classes.container}>
          <h4>You currently don't have any athletes assigned.</h4>
        </div>
      )
    }

    console.log('athletes: ', athletes);

    return (
      <div>
        <h2>Athletes</h2>
        <Table multiSelectable={false} selectable={false} style={{ marginTop: 10 }}>
          <TableHead>
            <TooltipCell tooltip="This is a custom name the athlete choose">
              Displayname
            </TooltipCell>
            <TableCell>First name</TableCell>
            <TableCell>Last name</TableCell>
            <TableCell>Email</TableCell>
          </TableHead>
          {athletes.map((item, idx) => (
            <TableRow key={idx} selectable={false}>
              <TableCell><div>{item.displayName}</div></TableCell>
              <TableCell><div>{item.firstName}</div></TableCell>
              <TableCell><div>{item.lastName}</div></TableCell>
              <TableCell><div>{item.email}</div></TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    );
  }
}
