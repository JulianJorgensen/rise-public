export const firebase = {
  apiKey: ENV_CONFIG.firebase.apiKey,
  authDomain: ENV_CONFIG.firebase.authDomain,
  databaseURL: ENV_CONFIG.firebase.databaseURL,
  functions: ENV_CONFIG.firebase.functionsURL,
  storageBucket: ENV_CONFIG.firebase.storageBucket
}

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  profileParamsToPopulate: [
    { child: 'role', root: 'roles' },
    { child: 'mentor', root: 'users' },
    { child: 'athletes', root: 'users' }
  ],
  // enableLogging: false, // enable/disable Firebase Database Logging
  updateProfileOnLogin: false, // enable/disable updating of profile on login
  profileFactory: (user) => {
    return ({
      email: user.email || user.providerData[0].email,
      role: 'athlete-pending',
      applicationApproved: false,
      showLeftNavigation: true
    })
  }
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
