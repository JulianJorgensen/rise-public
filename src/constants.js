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

export default { ...paths, ...formNames }
