// ------------------------------------
// Actions
// ------------------------------------
export let setNotification = () => {
  return (dispatch, getState) => {
    dispatch({ type: 'SET_NOTIFICATION', message: 'this is a test notification' });
  }
};

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null
export default function notificationsReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        show: true,
        message: action.message
      };
    case 'CLOSE_NOTIFICATION':
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}
