import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS } from 'react-redux-firebase';
import { reduxFirebase as rfConfig } from 'app/config';
import { userIsAdmin, userIsAuthenticated, userHasPermission } from 'utils/router'
import { Table, TableHead, TableRow, TableCell, Tooltip } from 'react-toolbox/lib';
import ReactPaginate from 'react-paginate';

import LoadingSpinner from 'components/LoadingSpinner';
import classes from './index.css';
import pagination from 'styles/pagination.css';
import Items from './components/Items';

const TooltipCell = Tooltip(TableCell);

@withRouter
@userIsAuthenticated
@userIsAdmin
@firebaseConnect([
  'users'
])
@connect(
  ({ firebase }) => ({
    users: dataToJS(firebase, 'users'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class Users extends Component {
  state = {
    selected: '',
    users: [],
    usersVisible: [],
    offset: 0,
    itemsPerPage: 10,
    pageCount: 0
  };

  handlePageClick = (data) => {
    let { users, itemsPerPage } = this.state;
    let selected = data.selected;
    let offset = Math.ceil(selected * itemsPerPage);

    this.setState({
      offset: offset,
      usersVisible: users.slice(offset, itemsPerPage+offset)
    });
  }

  setUsers = () => {
    let { itemsPerPage, offset, usersVisible, users } = this.state;
    let usersObj = this.props.users;

    if (usersObj && usersVisible.length <= 0) {
      let users = Object.keys(usersObj);
      this.setState({
        users: users,
        usersVisible: users.slice(offset, itemsPerPage+offset),
        pageCount: users.length / itemsPerPage
      });
    }
  };

  componentWillMount() {
    setTimeout(() => {
      this.setUsers();
    }, 300);
  }

  render () {
    let { pageCount, usersVisible } = this.state;
    let { account } = this.props;

    if(!account || usersVisible.length <= 0) {
      return (
        <LoadingSpinner />
      )
    }

    return (
      <div className={classes.container}>
        <h2>All users</h2>
        <Items data={usersVisible} />

        <ReactPaginate previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={pagination.break}
                       pageCount={pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={10}
                       onPageChange={this.handlePageClick}
                       containerClassName={pagination.container}
                       previousClassName={pagination.previous}
                       nextClassName={pagination.next}
                       pageClassName={pagination.page}
                       activeClassName={pagination.active} />
      </div>
    );
  }
}
