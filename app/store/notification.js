// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  show: false,
  message: '',
  style: '',
  url: ''
};
export default function notificationReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        show: true,
        message: action.message,
        style: action.style,
        url: action.url
      };
    case 'CLOSE_NOTIFICATION':
      return {
        ...state,
        show: false,
        message: '',
        style: '',
        url: ''
      };
    default:
      return state;
  }
}
