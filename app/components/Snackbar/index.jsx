import React, { Component, PropTypes } from 'react'
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import RTSnackbar from 'react-toolbox/lib/snackbar';
import classes from './index.css';

@withRouter
@connect(
  ({ snackbar }) => ({
    snackbar
  })
)
export default class Snackbar extends Component {
  handleCloseSnackbar = (e) => {
    this.props.dispatch({ type: 'CLOSE_SNACKBAR' });
  }

  handleSnackbarClick = () => {
    this.handleCloseSnackbar();
  }

  render() {
    let { snackbar } = this.props;

    if (!snackbar || !snackbar.show) {
      return <div></div>
    }

    return (
      <RTSnackbar
        active={snackbar.show}
        type='warning'
        action='close'
        label={snackbar.message}
        onClick={this.handleSnackbarClick}
        timeout={8000}
        onTimeout={this.handleSnackbarClick}
      />
    )
  }
}
