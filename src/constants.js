export const ABOUT_PATH = '/about'
export const FEATURES_PATH = '/features'
export const PRICING_PATH = '/pricing'
export const DASHBOARD_PATH = '/dashboard'
export const PROFILE_PATH = '/profile'
export const SETTINGS_PATH = '/settings'
export const GETTING_STARTED_PATH = '/getting-started'
export const SCHEDULE_PATH = '/schedule'
export const VIDEO_PATH = '/video'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'
export const RECOVER_PATH = '/forgot'
export const NOT_AUTHORIZED_PATH = '/notAuthorized'

export const ACCOUNT_FORM_NAME = 'account'
export const SPORTS_FORM_NAME = 'sports'
export const BANKING_FORM_NAME = 'banking'
export const SETTINGS_FORM_NAME = 'settings'
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
  settings: SETTINGS_FORM_NAME,
  login: LOGIN_FORM_NAME,
  recoverCode: RECOVER_CODE_FORM_NAME,
  recoverEmail: RECOVER_EMAIL_FORM_NAME
}

export const paths = {
  about: ABOUT_PATH,
  dashboard: DASHBOARD_PATH,
  profile: PROFILE_PATH,
  settings: SETTINGS_PATH,
  schedule: SCHEDULE_PATH,
  video: VIDEO_PATH,
  login: LOGIN_PATH,
  signup: SIGNUP_PATH,
  notAuthorized: NOT_AUTHORIZED_PATH
}

export const leftNav = [
  {
    url: 'dashboard',
    anchor: 'Dashboard',
    icon: 'fa-home',
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
    icon: 'fa-comments',
    children: [
      {
        url: 'inbox',
        anchor: 'Inbox',
        disabled: true
      },
      {
        url: 'sent',
        anchor: 'Sent',
        disabled: true
      }
    ]
  },
  {
    url: 'video',
    anchor: 'Video',
    icon: 'fa-video-camera',
    children: [
      {
        url: 'log',
        anchor: 'Call log'
      },
      {
        url: 'contacts',
        anchor: 'Contacts',
        disabled: true
      }
    ]
  },
  {
    url: 'library',
    anchor: 'Exercise Library',
    icon: 'fa-files-o',
    children: [
      {
        url: 'sport-1',
        anchor: 'Sport 1',
        disabled: true
      },
      {
        url: 'sport-2',
        anchor: 'Sport 2',
        disabled: true
      }
    ]
  },
  {
    url: 'schedule',
    anchor: 'Schedule',
    icon: 'fa-calendar'
  },
  {
    url: 'activity',
    anchor: 'Account Activity',
    icon: 'fa-tasks',
    children: [
      {
        url: 'login-time',
        anchor: 'Login Time',
        disabled: true
      },
      {
        url: 'payments',
        anchor: 'Payments',
        disabled: true
      },
      {
        url: 'overview',
        anchor: 'Overview',
        disabled: true
      }
    ]
  },
  {
    url: 'my-athletes',
    anchor: 'My Athletes',
    icon: 'fa-users',
    showOnlyFor: 'mentor',
    children: [
      {
        url: 'profiles',
        anchor: 'Profiles',
        disabled: true
      }
    ]
  }
];

export default { ...paths, ...formNames }
