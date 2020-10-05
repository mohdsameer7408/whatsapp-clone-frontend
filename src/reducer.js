export const initialState = {
  rooms: [],
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROOMS":
      return {
        ...state,
        rooms: action.payload.rooms,
      };
    case "ADD_A_ROOM":
      return {
        ...state,
        rooms: [action.payload.room, ...state.rooms],
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

export default reducer;
