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
    account: pathToJS(firebase, 'profile'),
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

  sortBy = (array, val) => {
    array.sort((a, b) => {
      if (!a[val] || !b[val]) return 0;
      let objA=a[val].toLowerCase(), objB=b[val].toLowerCase();
      if (objA < objB) return -1;
      if (objA > objB) return 1;
      return 0;
    });
    return array;
  }

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
    let usersObj = this.props.users;
    if (!usersObj) {
      setTimeout(() => {
        this.setUsers();
      }, 200);
      return false;
    }
    let { itemsPerPage, offset, usersVisible, users } = this.state;
    if (usersVisible.length <= 0) {
      let users = Object.values(usersObj);
      let sortedUsers = this.sortBy(users, 'firstName');

      this.setState({
        users: sortedUsers,
        usersVisible: users.slice(offset, itemsPerPage+offset),
        pageCount: users.length / itemsPerPage,
      });
    }
  };

  componentWillMount() {
    this.setUsers();
  }

  render () {
    let { pageCount, usersVisible, users } = this.state;
    let { account } = this.props;

    if(!account || usersVisible.length <= 0) {
      return (
        <LoadingSpinner />
      )
    }

    return (
      <div className={classes.container}>
        <h2>All users</h2>
        <Items users={users} data={usersVisible} />

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
