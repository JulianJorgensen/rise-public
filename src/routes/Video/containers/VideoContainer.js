import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'config';
import { UserIsAuthenticated, UserHasPermission } from 'utils/router'

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './VideoContainer.css';

@UserIsAuthenticated // redirect to /login if user is not authenticated
@UserHasPermission('video')
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Video extends Component {
  constructor(){
    super();

    this.state = {
      zoomActive: false
    }

    this.initZoom = this.initZoom.bind(this);
  }

  initZoom() {
    this.setState({zoomActive: true});
  }

  render () {
    let renderZoomIframe = () => {
      return (
        <iframe width="100%" height={800} style={{border: 0}} src="https://zoom.us/s/597304648" />
      )
    }

    return (
      <div className={classes.container}>
        {this.state.zoomActive ? renderZoomIframe() : <button onClick={this.initZoom}>Init zoom</button>}
      </div>
    )
  }
}
