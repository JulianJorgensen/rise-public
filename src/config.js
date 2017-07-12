export const firebase = {
  apiKey: 'AIzaSyDpuf3lnAJgGYn46QrZJ2fk9me5lZoy4fA',
  authDomain: 'rise-1602c.firebaseapp.com',
  databaseURL: 'https://rise-1602c.firebaseio.com',
  storageBucket: 'rise-1602c.appspot.com',
  functions: 'https://us-central1-rise-1602c.cloudfunctions.net'
}
// functions: 'http://localhost:5002/rise-1602c/us-central1'

// Config for react-redux-firebase
// For more details, visit https://prescottprue.gitbooks.io/react-redux-firebase/content/config.html
export const reduxFirebase = {
  userProfile: 'users', // root that user profiles are written to
  profileParamsToPopulate: [
    { child: 'role', root: 'roles' },
    { child: 'mentor', root: 'users' },
    { child: 'mentees', root: 'users', childParam: 'uid' }
  ],
  // enableLogging: false, // enable/disable Firebase Database Logging
  // updateProfileOnLogin: true, // enable/disable updating of profile on login
  profileFactory: (user) => {
    return ({
      email: user.email || user.providerData[0].email,
      role: 'athlete-pending',
      status: 'pending',
      showLeftNavigation: true
    })
  }
}

export const env = 'development'

export default { firebase, reduxFirebase, env }
