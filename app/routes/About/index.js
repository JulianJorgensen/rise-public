import React from 'react';
import {Link} from 'react-router-dom';
let {connect} = require('react-redux');

import Layout from 'react-toolbox/lib/layout/Layout';
import Button from 'components/Button';
import styles from './index.css';
import InstagramFeed from 'containers/InstagramFeed/InstagramFeed'

export default class AboutContainer extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <div className="page-content">
        <h1>About page</h1>
      </div>
    )
  }
}
