import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { userIsAuthenticated, userHasPermission } from 'utils/router'

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './MyAthletesContainer.css';

@userIsAuthenticated // redirect to /login if user is not authenticated
// @userHasPermission('my-athletes')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase: { auth, data: { todos }} }) => ({
    todos,
    auth
  })
)
export default class MyAthletes extends Component {
  constructor(){
    super();

    this.state = {
    }
  }

  render () {
    let { account } = this.props;

    console.log('account: ', account);

    return (
      <div className={classes.container}>
      </div>
    )
  }
}
