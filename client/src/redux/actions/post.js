import { GLOBALTYPES } from "./globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import {
  deleteDataAPI,
  getDataAPI,
  patchDataAPI,
  postDataAPI,
} from "../../utils/fetchData";
import { createNotify, removeNotify } from "./notify";
export const POST_TYPE = {
  CREATE_POST: "CREATE_POST",
  LOADING_POST: "LOADING_POST",
  GET_POSTS: "GET_POSTS",
  UPDATE_POST: "UPDATE_POST",
  DELETE_POST: "DELETE_POST",
  GET_POST: "GET_POST",
  UPDATE_PROFILE_POST: "UPDATE_PROFILE_POST",
  DELETE_PROFILE_POST: "DELETE_PROFILE_POST",

};

export const createPost =
  ({ content, images, auth, socket }) =>
  async (dispatch) => {
    let media = [];

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (images.length > 0) media = await imageUpload(images, auth);

      const res = await postDataAPI(
        "posts",
        { content, images: media },
        auth.token
      );

      dispatch({
        type: POST_TYPE.CREATE_POST,
        payload: { ...res.data.newPost },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });

      // Notify
      const msg = {
        id: res.data.newPost._id,
        text: "added a new Post",
        recipients: res.data.newPost.user.followers,
        url: `/post/${res.data.newPost._id}`,
        content,
        images:
          res.data.newPost.images.length === 0
            ? null
            : res.data.newPost.images[0].url,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const getPosts = (token) => async (dispatch) => {
  try {
    dispatch({ type: POST_TYPE.LOADING_POST, payload: true });
    const res = await getDataAPI("posts", token);

    dispatch({ type: POST_TYPE.GET_POSTS, payload: res.data });

    dispatch({ type: POST_TYPE.LOADING_POST, payload: false });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err.response.data.msg },
    });
  }
};

export const getPost =
  ({ detailPost, id, auth }) =>
  async (dispatch) => {
    if (detailPost.every((post) => post._id !== id)) {
      try {
        const res = await getDataAPI(`post/${id}`, auth.token);
        dispatch({ type: POST_TYPE.GET_POST, payload: res.data.post });
      } catch (err) {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: { error: err.response.data.msg },
        });
      }
    }
  };

export const likePost =
  ({ post, auth, socket,page }) =>
  async (dispatch) => {
    const newPost = { ...post, likes: [...post.likes, auth.user] };

    if (page === "profile") {
      dispatch({ type: POST_TYPE.UPDATE_PROFILE_POST, payload: newPost });
    } else {
      dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
    }
    socket.emit("likePost", newPost);

    try {
      await patchDataAPI(`post/${post._id}/like`, null, auth.token);
      //notify

      const msg = {
        id: auth.user._id,
        text: "liked your Post",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
        content: post.content,
        image: post.images[0] === 0 ? post.images[0].url : null,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const unlikePost =
  ({ post, auth, socket, page }) =>
  async (dispatch) => {
    const newPost = !page?{
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    }:{
      ...post,
      likes: post.likes.filter((like) => like._id !== auth.user._id),
    };
    if (page === "profile") {

      dispatch({ type: POST_TYPE.DELETE_PROFILE_POST, payload: newPost });
    } else {
      dispatch({ type: POST_TYPE.UPDATE_POST, payload: newPost });
    }
    socket.emit("unLikePost", newPost);

    try {
      await patchDataAPI(`post/${post._id}/unlike`, null, auth.token);
      const msg = {
        id: auth.user._id,
        text: "liked your Post",
        recipients: [post.user._id],
        url: `/post/${post._id}`,
      };
      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const updatePost =
  ({ content, images, auth, status }) =>
  async (dispatch) => {
    let media = [];
    const imgNewUrl = images.filter((img) => !img.url);
    const imgOldUrl = images.filter((img) => img.url);

    if (
      status.content === content &&
      imgNewUrl.length === 0 &&
      imgOldUrl.length === status.images.length
    )
      return;

    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      if (images.length > 0) media = await imageUpload(imgNewUrl, auth);
      //
      const res = await patchDataAPI(
        `post/${status._id}`,
        { content, images: [...imgOldUrl, ...media] },
        auth.token
      );

      dispatch({ type: POST_TYPE.UPDATE_POST, payload: res.data.newPost });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };

export const deletePost =
  ({ post, auth, socket }) =>
  async (dispatch) => {
    dispatch({ type: POST_TYPE.DELETE_POST, payload: post });
    try {
      const res = await deleteDataAPI(`post/${post._id}`, auth.token);

      const msg = {
        id: post._id,
        text: "added a new Post",
        recipients: res.data.newPost.user.followers,
        url: `/post/${post._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: err.response.data.msg },
      });
    }
  };
