import React, { Component, cloneElement, PropTypes } from 'react'
import { map } from 'lodash'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  populatedDataToJS,
  pathToJS,
  isLoaded,
  isEmpty
} from 'react-redux-firebase'
import { LIST_PATH } from 'constants'
import { UserIsAuthenticated } from 'utils/router'
import LoadingSpinner from 'components/LoadingSpinner'
import classes from './DashboardContainer.css'

const populates = [
  { child: 'createdBy', root: 'users', keyProp: 'uid' }
]

@UserIsAuthenticated
@firebaseConnect([
  { path: 'projects', populates }
  // 'projects#populate=owner:users' // string equivalent
])
@connect(
  ({ firebase }, { params }) => ({
    auth: pathToJS(firebase, 'auth'),
    projects: populatedDataToJS(firebase, 'projects', populates)
  })
)
export default class Dashboard extends Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    projects: PropTypes.object,
    firebase: PropTypes.object,
    auth: PropTypes.object,
    children: PropTypes.object
  }

  state = {
    newProjectModal: false,
    addProjectModal: false
  }

  newSubmit = (newProject) => {
    const { firebase: { pushWithMeta } } = this.props
    return pushWithMeta('projects', newProject)
      .then(() => this.setState({ newProjectModal: false }))
      .catch(err => {
        // TODO: Show Snackbar
        console.error('error creating new project', err) // eslint-disable-line
      })
  }

  deleteProject = (key) => {
    return this.props.firebase.remove(`projects/${key}`)
      .then(() => {
        // TODO: Show snackbar
      })
  }

  toggleModal = (name, project) => {
    this.setState({ [`${name}Modal`]: !this.state[`${name}Modal`] })
  }

  render () {
    const { projects, auth } = this.props

    if (!isLoaded(projects, auth)) {
      return <LoadingSpinner />
    }

    // Project Route is being loaded
    if (this.props.children) {
      // pass all props to children routes
      return cloneElement(this.props.children, this.props)
    }

    const { newProjectModal } = this.state

    return (
      <div className="page-content">
        <h1>Dashboard</h1>
      </div>
    )
  }
}
