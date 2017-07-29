export const ABOUT_PATH = '/about'
export const FEATURES_PATH = '/features'
export const PRICING_PATH = '/pricing'
export const DASHBOARD_PATH = '/dashboard'
export const PROFILE_PATH = '/dashboard/profile'
export const SETTINGS_PATH = '/dashboard/settings'
export const GETTING_STARTED_PATH = '/getting-started'
export const SCHEDULE_PATH = '/schedule'
export const MY_ATHLETES_PATH = '/my-athletes'
export const VIDEO_PATH = '/video'
export const LOGIN_PATH = '/login'
export const SIGNUP_PATH = '/signup'
export const RECOVER_PATH = '/forgot'
export const NOT_AUTHORIZED_PATH = '/notAuthorized'

export const ACCOUNT_FORM_NAME = 'account'
export const SPORTS_FORM_NAME = 'sports'
export const BANKING_FORM_NAME = 'banking'
export const SETTINGS_FORM_NAME = 'settings'
export const CONFIRMATION_FORM_NAME = 'confirmation'
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
  myAthletes: MY_ATHLETES_PATH,
  video: VIDEO_PATH,
  login: LOGIN_PATH,
  signup: SIGNUP_PATH,
  notAuthorized: NOT_AUTHORIZED_PATH
}

export default { ...paths, ...formNames }
