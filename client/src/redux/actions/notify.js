import { GLOBALTYPES } from "./globalTypes";
import {
  getDataAPI,
  postDataAPI,
  patchDataAPI,
  deleteDataAPI,
} from "../../utils/fetchData";

export const NOTIFY_TYPES = {
  GET_NOTIFIES: "GET_NOTIFIES",
  CREATE_NOTIFY: "CREATE_NOTIFY",
  REMOVE_NOTIFY: "REMOVE_NOTIFY",
  DELETE_ALL: "DELETE_ALL",
};

export const getNotifies = (token, socket) => async (dispatch) => {
  try {
    const res = await getDataAPI("notifies", token);

    dispatch({ type: NOTIFY_TYPES.GET_NOTIFIES, payload: res.data.notifies });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const createNotify =({ msg, auth, socket }) =>async (dispatch) => {
    try {
      const res = await postDataAPI("notify", msg, auth.token);
      
      socket.emit("createNotify", {
        ...res.data.notify,
        user: {
          fullname: auth.user.fullname,
          avatar: auth.user.avatar,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const removeNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(
        `notify/${msg.id}?url=${msg.url}`,
        auth.token
      );

      dispatch({ type: "REMOVE_NOTIFY", payload: res.data.notifies });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deleteNotify =
  ({ msg, auth, socket }) =>
  async (dispatch) => {
    try {
      const res = await deleteDataAPI(`deleteAllNotify`, auth.token);

      dispatch({ type: "DELETE_ALL", payload: [] });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
