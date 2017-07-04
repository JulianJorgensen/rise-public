// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import Home from './Home'
import AboutRoute from './About'
import FeaturesRoute from './Features'
import PricingRoute from './Pricing'
import SettingsRoute from './Settings'
import ScheduleRoute from './Schedule'
import VideoRoute from './Video'
import LoginRoute from './Login'
import SignupRoute from './Signup'
import DashboardRoute from './Dashboard'
import ProfileRoute from './Profile'
import GettingStartedRoute from './GettingStarted'
import RecoverRoute from './Recover'
import NotAuthorized from './NotAuthorized'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) => ({
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    ProfileRoute,
    GettingStartedRoute,
    AboutRoute,
    FeaturesRoute,
    PricingRoute,
    SettingsRoute,
    ScheduleRoute,
    VideoRoute,
    LoginRoute,
    SignupRoute,
    NotAuthorized,
    DashboardRoute(store), // async route definitions recieve store
    RecoverRoute(store) // async route definitions recieve store
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
