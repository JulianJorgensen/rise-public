import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'
import { connect } from 'react-redux'
import { firebaseConnect, pathToJS, isLoaded } from 'react-redux-firebase'
import { reduxFirebase as rfConfig } from 'config'
import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './GettingStartedContainer.css'

@UserIsAuthenticated // redirect to /login if user is not authenticated
@firebaseConnect() // add this.props.firebase
@connect( // Map redux state to props
  ({ firebase }) => ({
    auth: pathToJS(firebase, 'auth'),
    account: pathToJS(firebase, 'profile')
  })
)
export default class GettingStarted extends Component {
  static propTypes = {
    account: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    firebase: PropTypes.shape({
      update: PropTypes.func.isRequired,
      logout: PropTypes.func.isRequired
    })
  }

  state = { modalOpen: false }

  handleLogout = () => this.props.firebase.logout()

  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    })
  }

  updateAccount = (newData) =>
    this.props.firebase
      .update(`${rfConfig.userProfile}/${this.props.auth.uid}`, newData)
      .catch((err) => {
        console.error('Error updating account', err) // eslint-disable-line no-console
        // TODO: Display error to user
      })

  render () {
    const { account } = this.props

    if (!isLoaded(account)) {
      return <LoadingSpinner />
    }

    return (
      <div className="page-content">
        <h1>Getting started page</h1>
      </div>
    )
  }
}
