import React, { Component, cloneElement, PropTypes } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { firebaseConnect, dataToJS, pathToJS, isEmpty, isLoaded } from 'react-redux-firebase';
import { firebase as fbConfig } from 'app/config';
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment-timezone';
import { userIsAuthenticated, userHasPermission } from 'utils/router';
import LoadingSpinner from 'components/LoadingSpinner';
import ReactPaginate from 'react-paginate';

import classes from './index.css';
import pagination from 'styles/pagination.css';

import Items from './components/Items';
import Export from './components/Export';
import DateRange from './components/DateRange';

@withRouter
@userIsAuthenticated
//@userHasPermission('admin')
@firebaseConnect()
@connect( // Map redux state to props
  ({ firebase }) => ({
    account: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)
export default class AdminCallLogs extends Component {
  state = {
    meetings: null,
    meetingsFiltered: null,
    offset: 0,
    itemsPerPage: 10,
    pageCount: 0,
    allMeetingsFetched: false,
    startDate: null,
    endDate: moment.tz().toDate()
  }

  fetchPastMeetings() {
    let { timezone } = this.props.account;
    let now = moment().format('YYYY-MM-DDTHH:MM:SSz');
    let twoYearsAgo = moment().subtract(2, 'Y').format('YYYY-MM-DDTHH:MM:SSz');

    console.log('getting all meeting=====');
    axios.get(`${fbConfig.functions}/getAllMeetings`, {
      params: {
        appointmentTypeID: ENV_CONFIG.ACUITY_MENTOR_CALL_ID,
        minDate: twoYearsAgo,
        maxDate: now,
        max: 9999
      }
    })
    .then((response) => {
      let meetings = response.data;

      this.setState({
        meetings,
        allMeetingsFetched: true
      }, () => {
        this.filterMeetings();
      });
    })
    .catch((error) => {
      console.log(`Error getting all meetings`, error);
    });
  }

  handlePageClick = (data) => {
    console.log('admin call log handlePageClick ');
    let selected = data.selected;
    let offset = Math.ceil(selected * this.state.itemsPerPage);

    this.setState({offset: offset}, () => {
      this.filterMeetings();
    });
  }

  handleDateChange = (type, value) => {
    console.log('admin call log handleDateChange ');
    this.setState({[type]: value}, () => {
      this.filterMeetings();
    });
  }

  filterMeetings = () => {
    console.log('admin call log filterMeetings ');
    let { meetings, allMeetingsFetched, startDate, endDate, offset, itemsPerPage } = this.state;

    let meetingsDateFiltered = allMeetingsFetched ? meetings.filter((meeting) => {
      let meetingDateTime = moment(meeting.datetime, 'YYYY-MM-DDTHH:mm:ssZ').toDate();
      if(startDate) {
        return meetingDateTime >= startDate && meetingDateTime <= endDate;
      }
      return meetingDateTime <= endDate;
    }) : meetings;

    this.setState({
      meetingsFiltered: meetingsDateFiltered,
      meetingsVisible: meetingsDateFiltered.slice(offset, itemsPerPage+offset),
      pageCount: meetingsDateFiltered.length / this.state.itemsPerPage
    });
  }

  componentDidMount() {
    setTimeout(() => {
      if (this.props.account) {
        this.fetchPastMeetings();
      }
    }, 1000);
  }

  render () {
    let { allMeetingsFetched } = this.state;
    let { account, history } = this.props;

    if(!account || !allMeetingsFetched) {
      return <LoadingSpinner />
    }

    let { meetings, meetingsFiltered, meetingsVisible, itemsPerPage, offset, pageCount, startDate, endDate } = this.state;

    if (!meetingsFiltered) {
      return (
        <LoadingSpinner />
      )
    }

    return (
      <div className={classes.container}>
        <DateRange
          handleDateChange={this.handleDateChange}
          startDate={startDate}
          endDate={endDate}
        />

        <Items data={meetingsVisible} />

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

        {allMeetingsFetched ? <Export meetings={meetingsFiltered} /> : <LoadingSpinner />}
      </div>
    )
  }
}
