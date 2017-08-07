// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  show: false,
  message: '',
  style: ''
};
export default function snackbarReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_SNACKBAR':
      console.log('setting snackbar: ', action);
      return {
        ...state,
        show: true,
        message: action.message,
        style: action.style
      };
    case 'CLOSE_SNACKBAR':
      return {
        ...state,
        show: false,
        message: '',
        style: ''
      };
    default:
      return state;
  }
}
