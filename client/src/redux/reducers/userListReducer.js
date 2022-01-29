import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {
  show: false,
  userdata: [],
  image:false
};

const userList = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.USERLIST: {
      return {
        ...state,
        show: action.payload.show,
        userdata: action.payload.userdata,
        image:action.payload.image
      };
    }

    default:
      return state;
  }
};

export default userList;
