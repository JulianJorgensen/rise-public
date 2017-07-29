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
        ...state,
        upcoming: [
          ...action.upcomingMeetings
        ],
        completed: [
          ...action.completedMeetings
        ]
      };
    case 'SET_ALL_MEETINGS':
      return {
        ...state,
        all: {
          upcoming: [
            ...action.upcomingMeetings
          ],
          completed: [
            ...action.completedMeetings
          ]
        }
      };
    default:
      return state;
  }
}
