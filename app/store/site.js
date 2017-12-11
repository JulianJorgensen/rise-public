const initialState = {};
export default function siteReducer (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MOBILE_NAV':
      console.log('TOGGLE_MOBILE_NAV', !state.showMobileNav);
      return {
        ...state,
        showMobileNav: !state.showMobileNav,
      };
    case 'CLOSE_MOBILE_NAV':
      console.log('Close mobile nav');
      return {
        ...state,
        showMobileNav: false,
      };
    default:
      return state;
  }
}
