import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');

import Layout from 'react-toolbox/lib/layout/Layout';
import Button from 'components/Button';
import styles from './NotAuthorizedContainer.css';

export default class NotAuthorizedContainer extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="page-content">
        <h1>You are not authorized to see this page.</h1>
      </div>
    )
  }
}
