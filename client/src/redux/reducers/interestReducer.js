import { PROFILE_TYPES } from "../actions/profile";

const initialState = {
  interest: [],
};

const interestReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.ADD_INTEREST:
      return {
        ...state,
        interest: action.payload,
      };
    default:
      return state;
  }
};

export default interestReducer;
