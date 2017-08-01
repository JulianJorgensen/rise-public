// ------------------------------------
// Actions
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {needsUpdate: true};
export default function meetingsReducer (state = initialState, action) {
  switch (action.type) {
    case 'SET_MEETINGS':
      return {
        ...state,
        upcoming: [
          ...action.upcoming
        ],
        completed: [
          ...action.completed
        ]
      };
    case 'SET_ALL_MEETINGS':
      return {
        ...state,
        all: {
          upcoming: [
            ...action.upcoming
          ],
          completed: [
            ...action.completed
          ]
        }
      };
    case 'MEETINGS_NEEDS_UPDATE':
      return {
        ...state,
        needsUpdate: action.state
      };
    default:
      return state;
  }
}
