// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = null;
export default function meetingsReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_MEETINGS':
      return {
        upcoming: [
          ...action.upcomingMeetings
        ],
        completed: [
          ...action.completedMeetings
        ]
      };
    default:
      return state;
  }
}
