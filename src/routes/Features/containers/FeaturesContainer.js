import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');

import Layout from 'react-toolbox/lib/layout/Layout';
import Button from 'components/Button';
import styles from './FeaturesContainer.css';

export default class FeaturesContainer extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div className="page-content">
        <h1>Features page</h1>
      </div>
    )
  }
}
