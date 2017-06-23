export const ABOUT_PATH = '/about'
export const FEATURES_PATH = '/features'
export const PRICING_PATH = '/pricing'
export const LIST_PATH = '/dashboard'
export const DETAIL_PATH = ':projectname'
export const ACCOUNT_PATH = '/account'
export const GETTING_STARTED_PATH = '/getting-started'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'
export const RECOVER_PATH = '/forgot'
export const NOT_AUTHORIZED_PATH = '/notAuthorized'

export const ACCOUNT_FORM_NAME = 'account'
export const SPORTS_FORM_NAME = 'sports'
export const BANKING_FORM_NAME = 'banking'
export const LOGIN_FORM_NAME = 'login'
export const ATHLETE_SIGNUP_FORM_NAME = 'athleteSignup'
export const MENTOR_SIGNUP_FORM_NAME = 'mentorSignup'
export const NEW_PROJECT_FORM_NAME = 'newProject'
export const RECOVER_CODE_FORM_NAME = 'recoverCode'
export const RECOVER_EMAIL_FORM_NAME = 'recoverEmail'

export const formNames = {
  account: ACCOUNT_FORM_NAME,
  athleteSignup: ATHLETE_SIGNUP_FORM_NAME,
  mentorSignup: MENTOR_SIGNUP_FORM_NAME,
  login: LOGIN_FORM_NAME,
  recoverCode: RECOVER_CODE_FORM_NAME,
  recoverEmail: RECOVER_EMAIL_FORM_NAME
}

export const paths = {
  about: ABOUT_PATH,
  list: LIST_PATH,
  account: ACCOUNT_PATH,
  detail: DETAIL_PATH,
  login: LOGIN_PATH,
  signup: SIGNUP_PATH,
  notAuthorized: NOT_AUTHORIZED_PATH
}

export const leftNav = [
  {
    url: 'dashboard',
    anchor: 'Dashboard',
    children: [
      {
        url: 'getting-started',
        anchor: 'Getting started'
      },
      {
        url: 'profile',
        anchor: 'Profile'
      },
      {
        url: 'settings',
        anchor: 'Settings'
      }
    ]
  },
  {
    url: 'chat',
    anchor: 'Chat',
    children: [
      {
        url: 'inbox',
        anchor: 'Inbox'
      },
      {
        url: 'sent',
        anchor: 'Sent'
      }
    ]
  },
  {
    url: 'video',
    anchor: 'Video',
    children: [
      {
        url: 'contacts',
        anchor: 'Contacts'
      },
      {
        url: 'log',
        anchor: 'Call log'
      }
    ]
  },
  {
    url: 'library',
    anchor: 'Exercise Library',
    children: [
      {
        url: 'sport1',
        anchor: 'Sport 1'
      },
      {
        url: 'sport2',
        anchor: 'Sport 2'
      }
    ]
  },
  {
    url: 'schedule',
    anchor: 'Schedule',
    children: [
      {
        url: 'calendar',
        anchor: 'Calendar'
      },
      {
        url: 'alerts',
        anchor: 'Alerts'
      }
    ]
  },
  {
    url: 'activity',
    anchor: 'Account Activity',
    children: [
      {
        url: 'login-time',
        anchor: 'Login Time'
      },
      {
        url: 'payments',
        anchor: 'Payments'
      },
      {
        url: 'overview',
        anchor: 'Overview'
      }
    ]
  },
  {
    url: 'my-athletes',
    anchor: 'My Athletes',
    children: [
      {
        url: 'profiles',
        anchor: 'Profiles'
      }
    ]
  }
];

export default { ...paths, ...formNames }
