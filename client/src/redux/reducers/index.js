import { combineReducers } from "redux";
import auth from "./authReducer";
import alert from "./alertReducers";
import profile from "./profileReducer";
import status from "./statusReducer";
import homePosts from "./postReducer";
import socket from "./socketReducer";
import message from "./messageReducer";
import interest from "./interestReducer";
import modal from "./modalReducer";
import notify from "./notifyReducer";
import userlist from "./userListReducer";
import pageId from './pageReducer'
import detailPost from './detailPostReducer'

export default combineReducers({
  auth,
  alert,
  profile,
  status,
  homePosts,
  socket,
  message,
  interest,
  modal,
  notify,
  userlist,
  pageId,
  detailPost
});
