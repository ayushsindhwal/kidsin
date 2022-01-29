import { PROFILE_TYPES } from "../actions/profile.js";
import { EditData } from "../actions/globalTypes";
const initialState = {
  loading: false,
  users: [],
  posts: [],
  details: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case PROFILE_TYPES.GET_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
        details: action.payload,
      };

    case PROFILE_TYPES.FOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };

    case PROFILE_TYPES.UNFOLLOW:
      return {
        ...state,
        users: EditData(state.users, action.payload._id, action.payload),
      };
    case PROFILE_TYPES.DETAILS:
      return {
        ...state,
        details: action.payload,
      };

    default:
      return state;
  }
};

export default profileReducer;
